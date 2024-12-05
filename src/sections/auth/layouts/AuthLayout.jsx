import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import { ThemeChanger } from '../../../common/components/ThemeChanger'

export const AuthLayout = ({children}) => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-zinc-800 bg-zinc-100">
    <Card
        className="w-full max-w-sm p-5">
        <CardHeader className="flex gap-3 flex-row">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
            />
            <div className="flex flex-col">
                <p className="text-md">Ruled App</p>
                <p className="text-small text-default-500">ruled.app</p>
            </div>
            <p className="text-2xl font-bold text-end inline-flex grow justify-end pr-2">
                {/* <Button isIconOnly disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </Button> */}
                <ThemeChanger/>
            </p>
        </CardHeader>
        <CardBody>
            {children}
        </CardBody>
        {/* <CardFooter className="grid grid-rows-3 justify-center">
            <Divider className="my-4"/>
                <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
                >
                    Login with Google.
                </Link>
                <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
                >
                    Login with GitHub.
                </Link>

        </CardFooter> */}

    </Card>
    <ToastContainer />
</div>
  )
}
