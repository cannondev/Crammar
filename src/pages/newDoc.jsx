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
import { toast } from 'react-toastify';
import useStore from '../store';

function NewDoc() {
  // local states for holding without API calling
  const [title, setTitle] = useState('');
  const [content] = useState('');
  const [preview] = useState('');
  const [description] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const createDoc = useStore((state) => state.docSlice.createDoc);
  const navigate = useNavigate();

  const onSubmitClick = async (e) => {
    e.preventDefault(); // prevents page-reload, handles with javascript
    if (!pdfFile) {
      toast.error('Please upload a PDF.');
      return;
    }
    const newDoc = {
      title,
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
      <Card.Root maxW="lg">
        <Card.Header>
          <Card.Title>Create a Document:</Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Title:</Field.Label>
              <Input
                placeholder="Enter title:"
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
                  <Button bg="brand.950" color="brand.500" size="sm">
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
          <Button as={NavLink} to="/" variant="outline">
            Cancel
          </Button>
          <Button type="submit" colorScheme="green">
            Create
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}

export default NewDoc;
