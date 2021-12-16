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
    useColorModeValue,
} from '@chakra-ui/react'
import {Form,Field,Formik} from "formik";
import { useToast } from '@chakra-ui/react'
import { doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/init-firebase";





export default  function Update ({id}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast()
    const firstField = React.useRef()

    async  function updateUsers2(values) {

        const userRef = doc(db, 'users', id.id);
        await  updateDoc(userRef,{
            id: id.id,
            displayName:values.displayName,
            email: values.email,
            administrativeDistrict:values.administrativeDistrict,
            legislativeDistrict:values.legislativeDistrict,
            barangay:values.barangay,

        })
    }


    return (
        <>

            <Button
                w={'full'}
                mt={8}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color={'white'}
                rounded={'md'} ref={btnRef} colorScheme='black' onClick={onOpen}
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                }}
            >
                Update User

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
                        Update Social Worker Account
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Formik
                                initialValues={{
                                    id: id.id,
                                    displayName:id.displayName,
                                    email: id.email,
                                    administrativeDistrict: id.administrativeDistrict,
                                    legislativeDistrict: id.legislativeDistrict,
                                    barangay: id.barangay,
                                }}
                                onSubmit={(values, actions) => {
                                    updateUsers2(values)
                                        .then(() => {
                                            toast({
                                                title: 'Success',
                                                description: 'User Profile Updated Successfully',
                                                status: 'info',
                                                duration: 9000,
                                                isClosable: true,
                                            })
                                            actions.setSubmitting(false)
                                            onClose()
                                        })

                                }}
                            >
                                {(props) => (
                                    <Form>
                                        <Field name='displayName' >
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.displayName && form.touched.displayName}>
                                                    <FormLabel htmlFor='displayName'>Display Name</FormLabel>
                                                    <Input {...field} id='displayName' placeholder='displayName' />
                                                    <FormErrorMessage>{form.errors.displayName}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name='email' >
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                    <FormLabel htmlFor='email'>Email Address</FormLabel>
                                                    <Input {...field} id='email' placeholder='email' />
                                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <FormControl >
                                            <Field as="select" name="legislativeDistrict">
                                                <option value="red">D1</option>
                                                <option value="green">D2</option>
                                                <option value="blue">D3</option>

                                            </Field></FormControl>

                                        <FormControl >

                                            <Field Select as="select" name="administrativeDistrict" >

                                                <option value="red">Paquibato</option>
                                                <option value="red2">Paquibato2</option>

                                            </Field>

                                        </FormControl>
                                        <FormControl >
                                            <Field as="select" name="barangay">
                                                <option value="col">Colosas</option>
                                                <option value="fat">Fatima (Benowang)</option>
                                                <option value="lum"> Lumiad</option>
                                                <option value="mab">Mabuhay</option>
                                                <option value="mal">  Malabog</option>
                                                <option value="map"> Mapula</option>
                                                <option value="pan"> Panalum</option>
                                                <option value="pand">  Pandaitan</option>
                                                <option value="paq">  Paquibato Proper</option>
                                                <option value="pare">  Paradise Embak</option>
                                                <option value="sal">  Salapawan</option>
                                                <option value="sumi"> Sumimao</option>
                                                <option value="tap"> Tapak</option>

                                            </Field></FormControl>

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
