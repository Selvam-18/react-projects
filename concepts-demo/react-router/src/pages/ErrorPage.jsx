import { useRouteError } from "react-router-dom"
import PageContent from "../components/PageContent"
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
    const error = useRouteError()

    let title = 'Error occured!';
    let message = 'Something Went wrong'

    if(error.status === 500) {
        message = JSON.parse(error.data).message
    }
    if (error.status === 404) {
        title = 'File not Found'
        message = 'File not found in the server'
    }

    return(

        <>
        <MainNavigation />
        <PageContent title={title} >
            <p>{message}</p>
        </PageContent>
        </>
    )
}