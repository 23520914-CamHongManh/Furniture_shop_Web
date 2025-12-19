import React from 'react'
import Layout from './common/Layout'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { Element } from '@stripe/react-stripe-js'
const stripePromise = loadStripe('STRIPE_PUBLIC_KEY')
const Checkout = () => {
    return (
        <Layout>
            <Element stripe={stripePromise}>
                <CheckoutForm />
            </Element>
        </Layout >
    )
}

export default Checkout