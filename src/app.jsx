import React from 'react';
import {
  Box,
  ChakraProvider,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import system from './theme/system';
import NavBar from './components/navbar';
import Home from './pages/home';
import Reader from './pages/reader';
import Library from './pages/library';
import Upload from './pages/upload';
import Footer from './components/footer';

export default function App() {
  return (
    <ChakraProvider value={system}>
      <Box bg="brand.500" minH="100vh">
        <Router>
          <NavBar />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/read/:docID" element={<Reader />} />
              <Route path="/library" element={<Library />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="*" element={<div>URL Not Found. Rats!</div>} />
            </Routes>
          </Box>
          <Footer />
        </Router>
        <ToastContainer positon="top-center" autoClose={3000} />
      </Box>
    </ChakraProvider>
  );
}
