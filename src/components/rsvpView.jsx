/* eslint-disable no-trailing-spaces */
import {
  Box, Button, Text, Spinner, Slider, Stack, 
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
  if (!Array.isArray(wordArray)) { // Ensure wordArray is an array, mostly a time waster to prevent undefined errors
    return <Spinner />;
  }

  const [wordIndex, setWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const arrayLen = wordArray.length - 1;
  const initialWpm = [101];

  // adapted from the Chakra-UI slider docs for changing the value
  // https://chakra-ui.com/docs/components/slider
  const [wpm, setWpm] = useState(initialWpm);
  const [endWpm, setEndWpm] = useState(initialWpm);
  const skipInterval = 20;

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

  // setInterval implementation was provided by chatGPT
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

      <Box
        display="flex"
        flexDirection="column"
        bg="brand.50"
        rounded={10}
        p={4}
        mt="75px"
      >
        {/* Playback Controls */}
        <Box display="flex" flexDirection="row" justifyContent="space-around">
          <Button onClick={handleToStart} _hover={{ bg: 'brand.950' }}>
            <FaBackwardStep />
          </Button>

          <Box display="flex" flexDirection="row" gap="20px">
            <Button onClick={handleSkipBack} _hover={{ bg: 'brand.950' }}>
              <FaBackward />
            </Button>

            <Button onClick={handlePlayPause} _hover={{ bg: 'brand.950' }}>
              {paused ? <FaPlay /> : <FaPause />} 
            </Button>

            <Button onClick={handleSkipForward} _hover={{ bg: 'brand.950' }}>
              <FaForward />
            </Button>
          </Box>

          <Button onClick={handleToEnd} _hover={{ bg: 'brand.950' }}>
            <FaForwardStep />
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          {/* See above for slider docs reference */}
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
              <Slider.Thumbs
                _hover={{ bg: 'brand.950' }}
                _active={{ bg: 'brand.950' }}
              />
            </Slider.Control>
          </Slider.Root>
          <Stack mt="3" gap="1">
            <Text fontWeight="regular">
              Words Per Minute:{' '}
              <Text as="span" color="brand.950" fontWeight="bold">
                {endWpm - 1}
              </Text>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
