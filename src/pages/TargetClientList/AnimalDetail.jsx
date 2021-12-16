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
    NumberInputField, Text, Heading, FormHelperText, Box
} from '@chakra-ui/react'
import {Form, Field, Formik, useField} from "formik";
import { useToast } from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons";
import { db } from '../../utils/init-firebase'
import {collection,  addDoc} from "firebase/firestore"

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";




const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


export default  function AnimalDetail ({works}) {


    async function createClient(values){
        const usersCollectionRef = collection(db, "client");
        await addDoc(usersCollectionRef, {
            first: values.firstname,
            middle: values.middlename,
            last: values.lastname,
            age: values.age,
            sex:values.sex
        });

    }

    const {publishedDate,onChange} = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast()
    const firstField = React.useRef()


    return (
        <>
            <Box><Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Animal Details
            </Button></Box>

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
                        Details Regarding Animal
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Formik   initialValues={{

                            }}
                                onSubmit={async (values) => {
                                    await sleep(500);
                                    alert(JSON.stringify(values, null, 2));
                                }}

                           >
                                {(props) => (
                                    <Form>
                                        <FormControl >
                                            <FormLabel htmlFor='firstname'>Type of Animal</FormLabel>
                                            <Field as="select" name="ownership" >
                                                <option value="owned">Owned</option>
                                                <option value="stray">Stray</option>
                                            </Field>
                                        </FormControl>
                                        <FormLabel htmlFor='mode'>Mode of Transmission</FormLabel>
                                        <FormControl >
                                            <FormLabel htmlFor='trans'>Type of Animal</FormLabel>
                                            <Field as="select" name="animalType" >
                                                <option value="dog">Dog</option>
                                                <option value="cat">Cat</option>
                                            </Field>
                                        </FormControl>
                                        <FormLabel htmlFor='mode'>Transmission Type</FormLabel>
                                        <div role="group" aria-labelledby="checkbox-group">
                                            <label>
                                                <Field type="checkbox" name="transmissionType" value="bite" />
                                               Bitten
                                            </label>
                                            <label>
                                                <Field type="checkbox" name="transmissionType" value="scratch" />
                                              Scratch
                                            </label>

                                            <label>
                                                <Field type="checkbox" name="transmissionType" value="saliva" />
                                                Saliva
                                            </label>
                                        </div>

                                        <Field name='others' >
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.others && form.touched.others}>
                                                    <FormLabel htmlFor='others'>If Others</FormLabel>
                                                    <Input {...field} id='others' placeholder='others' />
                                                    <FormErrorMessage>{form.errors.others}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>


                                        <FormControl>
                                            <FormLabel htmlFor="published-date">Date of Transmission</FormLabel>
                                            <DatePicker
                                                id="published-date"
                                                selectedDate={publishedDate}
                                                onChange={onChange}
                                                showPopperArrow={true}
                                            />
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
