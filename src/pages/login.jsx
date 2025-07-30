import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Card,
  Field,
  Input,
  Stack,
  createOverlay,
  Dialog,
  Portal,
} from '@chakra-ui/react';
import { FaXmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import useStore from '../store';

function Login({ onClose }) {
  // local states for holding before API calling
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const loginUser = useStore((state) => state.docSlice.loginUser);
  const registerUser = useStore((state) => state.docSlice.registerUser);
  const navigate = useNavigate();

  const onLoginClick = async (e) => {
    e.preventDefault(); // prevents page-reload, handles with javascript
    if (!username) {
      toast.error('Please provide a username.');
      return;
    }
    if (!password) {
      toast.error('Please provide a password.');
      return;
    }

    setLoading(true); // start spinner

    const user = {
      username,
      password,
    };
    await loginUser(user);

    setLoading(false);
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  const onRegisterClick = async (e) => {
    e.preventDefault(); // prevents page-reload, handles with javascript
    if (!username) {
      toast.error('Please provide a username.');
      return;
    }
    if (!password) {
      toast.error('Please provide a password.');
      return;
    }

    setLoading(true); // start spinner

    const user = {
      username,
      password,
    };

    await registerUser(user);

    setLoading(false);
    if (onClose) {
      onClose();
      navigate('/library');
    } else {
      navigate('/');
    }
  };

  return (
    // Form for creating a new user
    // Eventually rendered in a modal overlay
    // https://chakra-ui.com/docs/components/card
    <Box width="500px">
      <Card.Root maxW="lg" bg="brand.10">
        <Card.Header
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Card.Title color="brand.500" fontSize="2xl">
            Login:
          </Card.Title>
          <Button
            onClick={() => onClose && onClose()}
            to="/"
            variant="plain"
            color="red"
            size="lg"
          >
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
                Username:
              </Field.Label>
              <Input
                placeholder="Username:"
                autoComplete="off"
                fontWeight="semibold"
                bg="brand.500"
                color="brand.950"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field.Root>
            {/* File Upload Button */}
            {/* https://chakra-ui.com/docs/components/file-upload */}
            <Field.Root>
              <Field.Label
                fontSize="lg"
                color="brand.500"
                fontWeight="semibold"
              >
                Password:
              </Field.Label>
              <Input
                placeholder="Password:"
                autoComplete="off"
                fontWeight="semibold"
                bg="brand.500"
                color="brand.950"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end" gap="2">
          <Button
            type="button"
            fontWeight="semibold"
            colorPalette="green"
            variant="subtle"
            loading={loading}
            onClick={onRegisterClick}
          >
            Register
          </Button>
          <Button
            type="button"
            fontWeight="semibold"
            colorPalette="green"
            loading={loading}
            onClick={onLoginClick}
          >
            Login
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}

export default Login;

// The follwing is provided by chatGPT to create an overlay for the NewDoc component
// https://chakra-ui.com/docs/components/overlay
export const loginOverlay = createOverlay((props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Dialog.Root {...props}>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Dialog.Content>
          {/* render the same NewDoc, passing onClose */}
          <Login onClose={() => loginOverlay.close('login')} />
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
));
