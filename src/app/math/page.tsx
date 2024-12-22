"use client"

import Sidebar from "@/components/features/Sidebar/Sidebar";
import { mathTopics } from '@/data/topics'; // Assuming mathTopics is an array of topics
import MathSVG from "@/components/features/Questions/icons/MathSVG";
import { Topic } from "@/types/topic";
import { useState, useEffect } from "react";
import MathQuestion from "@/components/features/Questions/Question-UI/MathQuestion";
import Header from "@/components/features/Questions/Header";
import { useAnswerCounterStore, useScoreStore } from "@/store/score";
import { useAnswerStore } from "@/store/answer";
import ScoreModal from "@/components/features/Questions/Modals/ScoreModal";
import StreakModal from "@/components/features/Questions/Modals/StreakModal";
import { Answers } from "@/types/answer";
import { useScoreModalStore, useStreakAnnouncerModalStore, useStreakCounterModalStore } from "@/store/modals";
import StreakAnnouncer from "@/components/features/Questions/Modals/StreakAnnouncer";
import axios from "axios";

export interface QuestionData {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: number;
  explanation: string;
  skill: string;
}

const Math = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [randomQuestion, setRandomQuestion] = useState<QuestionData | null>(null);
  
  const isAnswerCorrect = useAnswerStore((state) => state.isAnswerCorrect);
  const setIsAnswerCorrect = useAnswerStore((state) => state.setIsAnswerCorrect);
  
  const increaseScore = useScoreStore((state) => state.increaseScore);
  const increaseCorrectCounter = useAnswerCounterStore((state) => state.increaseCount);
  const resetCorrectCounter = useAnswerCounterStore((state) => state.resetCount);
  const correctCount = useAnswerCounterStore((state) => state.count);

  const openScoreModal = useScoreModalStore((state) => state.openModal);
  const isScoreModalOpen = useScoreModalStore((state) => state.isOpen);
  const openAnnouncerModal = useStreakAnnouncerModalStore((state) => state.openModal);
  const isAnnouncerModalOpen = useStreakAnnouncerModalStore((state) => state.isOpen);
  const openStreakModal = useStreakCounterModalStore((state) => state.openModal);
  const isStreakModalOpen = useStreakCounterModalStore((state) => state.isOpen);

  useEffect(() => {
    if (correctCount === 3 || correctCount === 7) {
      openAnnouncerModal();
    }
  }, [correctCount, openAnnouncerModal]);

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    fetchRandomQuestion(topic);
  };

  const fetchRandomQuestion = async (topic: Topic) => {
    try {
      const response = await axios.get(`/api/questions/math?topic=${topic.name}`);
      const questionData = response.data.doc_array[0];
      setRandomQuestion(questionData);
    } catch (error) {
      console.error("Error fetching question:", error);
      setRandomQuestion(null);
    }
  };

  const answerCorrectRef: Record<Answers, number> = { A: 0, B: 1, C: 2, D: 3 };

  const handleAnswerSubmit = (answer: Answers) => {
    const correct = answerCorrectRef[answer] === randomQuestion?.correctAnswer;
    if (correct) {
      increaseCorrectCounter();
      increaseScore();
    } else {
      resetCorrectCounter();
    }
    setIsAnswerCorrect(correct);
    if (correct && selectedTopic) {
      setTimeout(() => {
        fetchRandomQuestion(selectedTopic);
      }, 1500);
    }
  };

  const openScoreModalHandler = () => {
    openScoreModal();
  };

  const openStreakModalHandler = () => {
    openStreakModal();
  };

  if (isScoreModalOpen || isStreakModalOpen) {
    return (
      <>
        <ScoreModal />
        <StreakModal />
      </>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar
        title="Math"
        svg={<MathSVG />}
        topics={mathTopics}
        selectedTopic={selectedTopic!}
        handleTopicClick={handleTopicClick}
        openScoreModal={openScoreModalHandler}
        openStreakModal={openStreakModalHandler}
      />
      
      {/* Main content */}
      <div className="flex flex-col flex-grow p-5 md:p-10">
        {selectedTopic ? (
          <div className="w-full mx-auto">
            <Header
              name={selectedTopic.name}
              question={randomQuestion?.question}
            />
            {randomQuestion ? (
              <MathQuestion
                title={randomQuestion.question}
                optionA={randomQuestion.optionA}
                optionB={randomQuestion.optionB}
                optionC={randomQuestion.optionC}
                optionD={randomQuestion.optionD}
                onAnswerSubmit={handleAnswerSubmit}
                id={randomQuestion.id}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        ) : (
          <div>Select a topic to get started</div>
        )}
      </div>

      {isAnnouncerModalOpen && <StreakAnnouncer />}
    </div>
  );
};

export default Math;
