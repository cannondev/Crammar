/* eslint-disable no-trailing-spaces */
import {
  Box,
  Button,
  Text,
  Spinner,
  Slider,
  Stack,
  Code,
} from '@chakra-ui/react';
import {
  FaBackwardStep,
  FaForwardStep,
  FaForward,
  FaBackward,
  FaPlay,
  FaPause,
} from 'react-icons/fa6';
import React, { useState, useEffect } from 'react';

export default function RSVPView({ wordArray }) {
  if (!Array.isArray(wordArray)) {
    return <Spinner />;
  }

  console.log(`word array: ${wordArray}`);
  const [wordIndex, setWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const arrayLen = wordArray.length - 1;
  const initialWpm = [101];
  const [wpm, setWpm] = useState(initialWpm);
  const [endWpm, setEndWpm] = useState(initialWpm);
  const skipInterval = 10;

  const handlePlayPause = () => {
    if (!paused) {
      setPaused(true);
    } else {
      setPaused(false);
    }
  };

  const handleToStart = () => {
    setWordIndex(0);
  };

  const handleToEnd = () => {
    setWordIndex(arrayLen);
  };

  const handleSkipBack = () => {
    if (wordIndex >= skipInterval) {
      setWordIndex(wordIndex - skipInterval);
    } else {
      setWordIndex(0);
    }
  };

  const handleSkipForward = () => {
    if (wordIndex <= arrayLen - skipInterval) {
      setWordIndex(wordIndex + skipInterval);
    } else {
      setWordIndex(arrayLen);
    }
  };

  useEffect(() => {
    let interval;

    if (!paused) {
      const delay = 60000 / wpm;

      interval = setInterval(() => {
        setWordIndex((prev) => {
          if (prev < arrayLen) {
            return prev + 1;
          } else {
            setPaused(true);
            return prev;
          }
        });
      }, delay);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paused, wpm, arrayLen]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="40vw"
      justifyContent="center"
      alignContent="center"
      p={4}
    >
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Text fontSize="80pt">{wordArray[wordIndex]}</Text>
      </Box>

      <Box display="flex" flexDirection="column" mt="75px">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt="3"
        >
          <Button onClick={handleToStart}>
            <FaBackwardStep />
          </Button>

          <Box display="flex" flexDirection="row" gap="20px">
            <Button onClick={handleSkipBack}>
              <FaBackward />
            </Button>

            <Button onClick={handlePlayPause}>
              {paused ? <FaPlay /> : <FaPause />}
            </Button>

            <Button onClick={handleSkipForward}>
              <FaForward />
            </Button>
          </Box>

          <Button onClick={handleToEnd}>
            <FaForwardStep />
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Slider.Root
            value={wpm}
            onValueChange={(e) => setWpm(e.value)}
            onValueChangeEnd={(e) => setEndWpm(e.value)}
            min={1}
            max={701}
            step={10}
            mt="3"
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
          <Stack mt="3" gap="1">
            <Code>
              Words Per Minute: <b>{endWpm - 1}</b>
            </Code>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
