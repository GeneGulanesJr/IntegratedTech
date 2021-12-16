import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input, Select,
  Stack,
  useToast,
} from '@chakra-ui/react'


import React, { useEffect, useRef, useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { Card } from '../components/Card'
import DividerWithText from '../components/DividerWithText'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'




export default function Registerpage() {

  const history = useHistory()
  const { signInWithGoogle, register } = useAuth()
  const [email, setEmail] = useState('')
  const [displayName, setName] = useState('')
  const [districtLegislative, setDistrictLegislative] = useState('')
  const [districtAdministrative, setDistrictAdministrative] = useState('')
  const [barangay, setBarangay] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const mounted = useRef(false)





  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])










  return (
      <Layout>
        <Heading textAlign='center' my={12}>
          Register
        </Heading>
        <Card maxW='md' mx='auto' mt={4}>
          <chakra.form
              onSubmit={async e => {
                e.preventDefault()
                if (!email || !password) {
                  toast({
                    description: 'Credentials not valid.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                  return
                }
                // your register logic here
                setIsSubmitting(true)
                register(email, password,displayName,barangay,districtAdministrative,districtLegislative)
                    .then(res => {  })
                    .catch(error => {
                      console.log(error.message)


                      toast({
                        description: error.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })
                    })
                    .finally(() => {
                      mounted.current && setIsSubmitting(false)
                    })
              }}
          >
            <Stack spacing='6'>
              <FormControl id='email' isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id='name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    name='name'
                    type='name'
                    autoComplete='name'
                    required
                    onChange={e => setName(e.target.value)}
                />
              </FormControl>

              <FormControl id='districtLegislative' isRequired>
                <FormLabel>Legislative District</FormLabel>

                <Select placeholder='Select Legislative District' value={districtLegislative}
                        onChange={e => setDistrictLegislative(e.target.value)}  >
                  <option value={"1d"}>1st District</option>
                  <option value={"2d"}>2nd District</option>
                  <option value={"3d"}>3rd District</option>
                </Select>
              </FormControl>

              <FormControl id='districtAdministrative' isRequired>
                <FormLabel>Administrative District</FormLabel>
                <Select placeholder='Select Administrative District' value={districtAdministrative}
                        onChange={e => setDistrictAdministrative(e.target.value)}  >
                  <option disabled="disabled" >District 1</option>
                  <option value={"pob"} >Poblacion</option>
                  <option value={"tal"}>Talomo</option>
                  <option disabled="disabled" >District 2</option>
                  <option value={"agd"}> Agdao</option>
                  <option value={"buh"}> Buhangin</option>
                  <option value={"bun"}> Bunawan</option>
                  <option value={"paq"}> Paquibato</option>
                  <option disabled="disabled" >District 3</option>
                  <option value={"bag"} > Baguio</option>
                  <option value={"cal"}>   Calinan</option>
                  <option value={"mar"}>Marilog</option>
                  <option value={"tor"}>Toril</option>
                  <option value={"tug"}> Tugbok</option>


                </Select>


              </FormControl>

              <FormControl id='barangay' isRequired>
                <FormLabel>Barangay</FormLabel>

                <Input
                    name='name'
                    type='name'
                    autoComplete='name'
                    required
                    value={barangay}
                    onChange={e => setBarangay(e.target.value)}
                />
              </FormControl>







              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    name='password'
                    type='password'
                    autoComplete='password'
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                  type='submit'
                  colorScheme='blue'
                  size='lg'
                  fontSize='md'
                  isLoading={isSubmitting}
              >
                Sign up
              </Button>
            </Stack>
          </chakra.form>
          <Center my={4}>
            <Button variant='link' onClick={() => history.push('/login')} >
              Login
            </Button>
          </Center>
          <DividerWithText my={6}>OR</DividerWithText>
          <Button
              variant='outline'
              isFullWidth
              colorScheme='red'
              leftIcon={<FaGoogle />}
              onClick={() =>
                  signInWithGoogle()
                      .then(user => console.log(user))
                      .catch(e => console.log(e.message))
              }
          >
            Sign in with Google
          </Button>
        </Card>
      </Layout>
  )
}
