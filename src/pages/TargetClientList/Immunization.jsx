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
import {collection, addDoc, doc, updateDoc} from "firebase/firestore"

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";




const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


export default  function Immunization ({works}) {


    async  function updateUsers(values) {
        const documentId = JSON.parse(JSON.stringify(works.id))
        const userRef = doc(db, 'patientInfo', documentId);
        await  updateDoc(userRef,{
            Immunization: values
        }).then(() => {
            alert("Form Updated Successfully")
        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });
    }

    const {publishedDate,onChange} = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast()
    const firstField = React.useRef()


    return (
        <>
            <Box>   <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                Immunization Details
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
                        Details Immunization
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Formik   initialValues={{

                            }}
                                      onSubmit={async (values) => {
                                          updateUsers(values)
                                      }}

                            >
                                {(props) => (
                                    <Form>



                                        <FormLabel htmlFor='mode'>Immunization Injection</FormLabel>
                                        <div role="group" aria-labelledby="checkbox-group">
                                            <label>
                                                <Field type="checkbox" name="transmissionType" value="first" />
                                                First Injection
                                            </label>
                                            <label>
                                                <Field type="checkbox" name="transmissionType" value="second" />
                                                Second Injection
                                            </label>

                                            <label>
                                                <Field type="checkbox" name="transmissionType" value="third" />
                                                Third Injection
                                            </label>
                                            <label>
                                                <Field type="checkbox" name="transmissionType" value="booster" />
                                                Booster
                                            </label>
                                        </div>








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
