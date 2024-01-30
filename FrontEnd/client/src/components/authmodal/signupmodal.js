import React from "react";
import {useState} from "react";
import globalUrl from "../url";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Checkbox,
    useDisclosure,
  } from "@nextui-org/react";
  
import { MailIcon } from "../../images/MailIcon.jsx";
import { LockIcon } from "../../images/LockIcon.jsx";
import { UserNameIcon } from "../../images/UserName.jsx";
import axios from "axios";

// -----------------------------------------------------------------------------
export default function ModalComponentSign() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [post,setPost]=useState({
    username:'',
    email:'',
    password:'',
  
  })

  const handleInput=(event)=>{
    setPost({...post,[event.target.name]: event.target.value})

  }

  const handleSubmit = async (event) => { 
    event.preventDefault();
    
    try {
      const response = await axios.post(`${globalUrl}/auth/register`, post);
      // const response = await axios.post('http://localhost:8000/URL/auth/register', post); 
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Button onPress={onOpen}>Sign Up</Button>
      <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            hideCloseButton={true}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-2xl">Sign Up</ModalHeader>
                  <form onSubmit={handleSubmit}>
                  <ModalBody>
                  
                    <Input
                      autoFocus
                      endContent={
                        <UserNameIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="username"
                      placeholder="Enter your name"
                      variant="bordered"
                      onChange={handleInput}
                      name="username"
                      id="username"
                      value={post.username}
                      classNames={{
                        label: "text-lg",
                        input: [
                          "placeholder:text-xl",
                          "text-xl"
    
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                       "h-20",
                        ],
                      }}
                    />
                    <Input
                      autoFocus
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="email"
                      placeholder="Enter your email"
                      variant="bordered"
                      onChange={handleInput}
                      name="email"
                      id="email"
                      value={post.email}
                      classNames={{
                        label: "text-lg",
                        input: [
                          "placeholder:text-xl",
                          "text-xl"
    
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                       "h-20",
                        ],
                      }}
                    />
                    <Input
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      id="password"
                      value={post.password}
                      onChange={handleInput}
                      variant="bordered"
                      classNames={{
                        label: "text-lg",
                        input: [
                          "placeholder:text-xl",
                          "text-xl"
    
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                       "h-20",
                        ],
                      }}
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        classNames={{
                          label: "text-small",
                        }}
                      >
                        Remember me
                      </Checkbox>
                      {/* <Link color="primary" href="#" size="sm">
                        Forgot password?
                      </Link> */}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose} 
                    type="submit"
                    // onClick={handleloginsubmit} 
                    >
                      Sign in
                    </Button>
                  </ModalFooter>
                  </form>
                  {/* <Button color="success" onClick={handleGoogleLogin} className="m-6 mx-12 text-xl text-white">Login with Google</Button> */}
    
                </>
              )}
            </ModalContent>
          </Modal>
    </>
  );
}
