import { Button, Input, Link, Spacer } from "@nextui-org/react"
import { AuthLayout } from "../layouts/AuthLayout"
import { useForm } from "../../../hooks/useForm"
import { registerUser } from "../../../services/authService"
import { useState } from "react"

export const RegisterPage = () => {
    const [registration, setRegistration] = useState({
        data:null,
        error:null,
        isLoading:false
    })

    const {username, email, password, onInputChange} = useForm({
        username:"",
        password :"",
        email: ""
    })

    const onSubmitRegister = async (e) => {
        setRegistration({isLoading:true})
        e.preventDefault()
        try {
            const resp = await registerUser(username, email, password)
            setRegistration({
                data: resp.data,
                isLoading: false
            })
        } catch (error) {
            console.log(error.status)
            setRegistration({
                error,
                isLoading: false
            })
        }
    }
    return (
        <AuthLayout>
            <form className="flex flex-col gap-4"
                onSubmit={onSubmitRegister}>
                <Input
                    label="Username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={onInputChange}
                    fullWidth
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onInputChange}
                    fullWidth
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onInputChange}
                    fullWidth
                />
                <Spacer y={1} />
                { registration?.error && 
                    <p className="text-center text-sm text-danger antialiased" color='primary'><b>Error: </b>{registration.error.message}</p>
                }
                { registration?.data && 
                    <p className="text-center text-sm antialiased" color='primary'>User <b>{registration.data.username}</b> created.</p>
                }
                <Button type="submit" color="primary" isLoading={registration.isLoading}>
                    Register
                </Button>
            </form>
            <Spacer y={3} />
            <div className="text-center">
                {/* <a href="#" className="text-blue-500 hover:underline"> */}
                <p>Do you have already an account?</p>
                <Link href="/auth/login"> Log in</Link>
                {/* </a> */}
            </div>
        </AuthLayout>
    )
}
