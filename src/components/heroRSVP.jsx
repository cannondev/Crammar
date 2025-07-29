import { Box, Text, Spinner } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

export default function HeroRSVP() {
  const [text, setText] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [wpm, setWpm] = useState(45);

  // computes when null to avoid rendering bugs. Thanks, chatGPT.
  const heroArray = text?.split(/\s+/) ?? [];
  const arrayLen = heroArray.length - 1;

  useEffect(() => {
    fetch('/heroText.txt')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(setText)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (heroIndex > 0 && heroIndex % 2 === 0) {
      setWpm((prev) => prev + 9);
    }
  }, [heroIndex]);

  useEffect(() => {
    const delay = 60000 / wpm;
    const iv = setInterval(() => {
      setHeroIndex((i) => Math.min(i + 1, arrayLen));
    }, delay);
    return () => clearInterval(iv);
  }, [wpm, arrayLen]);

  if (text === null) {
    return <Spinner size="xl" />;
  }

  return (
    <Box display="flex" justifyContent="center">
      <Text fontSize="80pt">{heroArray[heroIndex]}</Text>
    </Box>
  );
}
