import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/client'
import styles from "../styles/Home.module.css";
import {Avatar, Grid} from '@material-ui/core';
import {Row} from "antd";

export default function Header() {

    const [session] = useSession();

    const handleSignin = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        signIn()
    }
    const handleSignout = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        signOut()
    }
    return (
        <div className='header'>
            {/*{session && <a href="#" onClick={handleSignout} className="btn-signin">Sign out</a>  }*/}
            {!session && <a href="#" onClick={handleSignin}  className="btn-signin">Sign in</a>  }
            {session && <Row>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                <Avatar src={session?.user?.image+''} alt="" className={styles.avatar} />
                <p style={{ paddingLeft: '16px' }}> Welcome, {session?.user?.name ?? session?.user?.email}</p>
                </Grid>
            </Row>}
        </div>
    )
}
