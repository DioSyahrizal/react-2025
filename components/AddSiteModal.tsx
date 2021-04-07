import React, { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { SiteFormState } from '~/interfaces/sites';
import { createSite } from '~/lib/db';
import { useAuth } from '~/lib/auth';

const AddSiteModal = () => {
  const toast = useToast();
  const auth = useAuth();
  const initialRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm<SiteFormState>();

  const submitSite = ({ site, url }: SiteFormState) =>
    createSite({
      authorId: auth.user.uid,
      createAt: new Date().toISOString(),
      site,
      url
    })
      .then(() => {
        onClose();
        reset();
        toast({
          title: 'Success',
          description: "We've added your site",
          status: 'success',
          duration: 5000,
          isClosable: true
        });
      })
      .catch((err) => {
        throw new Error(err);
      });

  return (
    <>
      <Button fontWeight="medium" maxW="200px" onClick={onOpen}>
        Add Your First Site
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit((values) => submitSite(values))}
        >
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                name="site"
                placeholder="My sites"
                {...register('site', { required: true })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                name="link"
                placeholder="https://website.com"
                {...register('url', { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
