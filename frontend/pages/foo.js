import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const Foo1 = ({ token }) => {

    const [foo, setFoo] = useState({})

    useEffect(() => {
        fnFoo()
    }, [])

    const fnFoo = async () => {
        try {
            // console.log('token: ', token)
            const fooData = await axios.get(`${config.URL}/foo`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('foo: ', fooData.data)
            setFoo(fooData.data)
        }
        catch (e) {
            console.log(e)
        }

    }
 
    return (
        <Layout>
            <Head>
                <title>Foo</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <h1>Foo</h1>
                <div>
                    {/* <b>Token:</b> {token.substring(0, 15)}... <br /><br />
                    This route is protected by token, foo is required to login first.
                    <br/>
                    Otherwise, it will be redirect to Login page */}
                    <br/><br/>
                    {JSON.stringify(foo)}
                </div>
            </div>
        </Layout>
    )
}

export default withAuth(Foo1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
