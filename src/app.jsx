import React from 'react';
import {
  Box,
  Center,
  ChakraProvider,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import system from './theme/system';
import NavBar from './components/navbar';
import Home from './pages/home';
import Reader from './pages/reader';
import Library from './pages/library';
import NewDoc from './pages/newDoc';
import Footer from './components/footer';

export default function App() {
  return (
    <ChakraProvider value={system}>
      <Box display="flex" flexDirection="column" bg="brand.500" minH="100vh">
        <Router>
          <NavBar />
          <Box display="flex" flex="1" justifyContent="center" width="100%">
            <Center>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reader/:docID" element={<Reader />} />
                <Route path="/library" element={<Library />} />
                <Route path="/newDoc" element={<NewDoc />} />
                <Route path="*" element={<div>URL Not Found. Rats!</div>} />
              </Routes>
            </Center>
          </Box>
          <Footer />
        </Router>
        <ToastContainer position="top-center" autoClose={3000} />
      </Box>
    </ChakraProvider>
  );
}
