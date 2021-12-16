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


export default  function Immunization ({works}) {


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
