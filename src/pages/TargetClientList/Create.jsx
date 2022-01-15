import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Select,
  NumberInput,
  NumberInputField
} from '@chakra-ui/react'
import {Form,Field,Formik} from "formik";
import { useToast } from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons";
import { db } from '../../utils/init-firebase'
import {collection,  addDoc} from "firebase/firestore"




export default  function Create () {


async function createClient(values){
  const usersCollectionRef = collection(db, "patientInfo");
    await addDoc(usersCollectionRef, {
      first: values.firstname,
      middle: values.middlename,
      last: values.lastname,
      age: values.age,
      sex:values.sex,
      email:values.email
    });

}



  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const toast = useToast()
  const firstField = React.useRef()


  return (
      <>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          <AddIcon />
        </Button>
        <Drawer
            isOpen={isOpen}
            placement='right'
            initialFocusRef={firstField}
            onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              Create New Patient Record
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing='24px'>
                <Formik
                    initialValues={{

                    }}
                    onSubmit={(values, actions) => {

                      createClient(  JSON.parse(JSON.stringify(values)))

                          .then(() => {
                            toast({
                              title: 'Success',
                              description: 'User created successfully',
                              status: 'success',
                              duration: 9000,
                              isClosable: true,
                            })
                            actions.setSubmitting(false)
                            onClose()
                          })
                          .catch(err => {
                            toast({
                              title: 'Error',
                              description: err.message,
                              status: 'error',
                              duration: 9000,
                              isClosable: true,
                            })
                            actions.setSubmitting(false)
                          })

                    }}
                >
                  {(props) => (
                      <Form>
                        <Field name='firstname' >
                          {({ field, form }) => (
                              <FormControl isInvalid={form.errors.firstname && form.touched.firstname}>
                                <FormLabel htmlFor='firstname'>First Name</FormLabel>
                                <Input {...field} id='firstname' placeholder='firstname' />
                                <FormErrorMessage>{form.errors.firstname}</FormErrorMessage>
                              </FormControl>
                          )}
                        </Field>

                        <Field name='middlename' >
                          {({ field, form }) => (
                              <FormControl isInvalid={form.errors.middlename && form.touched.middlename}>
                                <FormLabel htmlFor='middlename'>Middle Name</FormLabel>
                                <Input {...field} id='middlename' placeholder='middlename' />
                                <FormErrorMessage>{form.errors.middlename}</FormErrorMessage>
                              </FormControl>
                          )}
                        </Field>
                        <Field name='lastname' >
                          {({ field, form }) => (
                              <FormControl isInvalid={form.errors.lastname && form.touched.lastname}>
                                <FormLabel htmlFor='lastname'>Last Name</FormLabel>
                                <Input {...field} id='lastname' placeholder='lastname' />
                                <FormErrorMessage>{form.errors.lastname}</FormErrorMessage>
                              </FormControl>
                          )}
                        </Field>

                        <Field name='email' >
                          {({ field, form }) => (
                              <FormControl isInvalid={form.errors.email && form.touched.email}>
                                <FormLabel htmlFor='email'>Email Address</FormLabel>
                                <Input {...field} id='email' placeholder='email' type = 'email' />
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                              </FormControl>
                          )}
                        </Field>


                        <Field name='age'  >
                          {({ field}) => (
                              <FormControl >
                                <FormLabel htmlFor='age'>Age</FormLabel>
                                <NumberInput >
                                  <NumberInputField {...field} id='age' placeholder='age' />
                                </NumberInput>
                              </FormControl>
                          )}
                        </Field>


                        <FormControl >
                          <Field as="select" name="sex" >
                            <option value='null'>Select Option</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>

                          </Field>
                        </FormControl>


                        <Button
                            mt={4}
                            colorScheme='teal'
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                          Submit
                        </Button>
                      </Form>
                  )}
                </Formik>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>


            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
  )
}
