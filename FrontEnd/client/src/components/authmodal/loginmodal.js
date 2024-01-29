import React from "react";
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


export default function ModalComponentLogIn() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Log In</Button>
      <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            hideCloseButton={true}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-2xl">Log In</ModalHeader>
                  <ModalBody>
                  
                    <Input
                      autoFocus
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="email"
                      placeholder="Enter your email"
                      variant="bordered"
                    //   onChange={handleInput}
                      name="email"
                    //   value={info.email}
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
                    //   value={info.password}
                    //   onChange={(handleInput)}
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
                      <Link color="primary" href="#" size="sm">
                        Forgot password?
                      </Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose} 
                    // onClick={handleloginsubmit} 
                    >
                      Log in
                    </Button>
                  </ModalFooter>
                  {/* <Button color="success" onClick={handleGoogleLogin} className="m-6 mx-12 text-xl text-white">Login with Google</Button> */}
    
                </>
              )}
            </ModalContent>
          </Modal>
    </>
  );
}
