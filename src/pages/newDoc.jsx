import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router';
import {
  Box,
  Button,
  Card,
  Field,
  Input,
  Stack,
  FileUpload,
} from '@chakra-ui/react';
import { HiUpload } from 'react-icons/hi';
import { FaXmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import useStore from '../store';

function NewDoc() {
  // local states for holding without API calling
  const [title, setTitle] = useState('');
  const [fileName] = useState('');
  const [content] = useState('');
  const [preview] = useState('');
  const [description] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const createDoc = useStore((state) => state.docSlice.createDoc);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmitClick = async (e) => {
    e.preventDefault(); // prevents page-reload, handles with javascript
    if (!title) {
      toast.error('Please provide a file nickname.');
      return;
    }
    if (!pdfFile) {
      toast.error('Please upload a PDF.');
      return;
    }

    setLoading(!loading);

    const newDoc = {
      title,
      fileName,
      content,
      preview,
      description,
      pdfFile,
    };
    await createDoc(newDoc);
    navigate('/');
  };

  // this needs to be a little card in the middle that is a form for all the states and file upload.
  return (
    <Box as="form" width="500px" onSubmit={onSubmitClick}>
      <Card.Root maxW="lg" bg="brand.10">
        <Card.Header
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Card.Title color="brand.500" fontSize="2xl">
            Create a Document:
          </Card.Title>
          <Button as={NavLink} to="/" variant="plain" color="red" size="lg">
            <FaXmark />
          </Button>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label
                fontSize="lg"
                color="brand.500"
                fontWeight="semibold"
              >
                PDF Nickname:
              </Field.Label>
              <Input
                placeholder="Enter title:"
                autoComplete="off"
                fontWeight="semibold"
                bg="brand.500"
                color="brand.950"
                size="lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field.Root>
            {/* File Upload Button */}
            <Box>
              <FileUpload.Root accept={['application/pdf']}>
                {' '}
                {/* application/pdf is the official MIME type */}
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                  <Button
                    bg="brand.950"
                    color="brand.500"
                    fontWeight="bold"
                    size="lg"
                  >
                    <HiUpload /> Upload PDF
                  </Button>
                </FileUpload.Trigger>
                {/* Capture the file in state */}
                <FileUpload.Context>
                  {({ acceptedFiles }) => {
                    useEffect(() => {
                      if (acceptedFiles.length > 0) {
                        setPdfFile(acceptedFiles[0]);
                      }
                    }, [acceptedFiles]);

                    return (
                      <FileUpload.ItemGroup>
                        {acceptedFiles.map((file) => (
                          <FileUpload.Item key={file.name} file={file}>
                            <FileUpload.ItemPreview />
                            <FileUpload.ItemName />
                            <FileUpload.ItemSizeText />
                            <FileUpload.ItemDeleteTrigger />
                          </FileUpload.Item>
                        ))}
                      </FileUpload.ItemGroup>
                    );
                  }}
                </FileUpload.Context>
              </FileUpload.Root>
            </Box>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end" gap="2">
          <Button type="submit" fontWeight="semibold" colorPalette="green" loading={loading} onClick={onSubmitClick}>
            Create
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}

export default NewDoc;
