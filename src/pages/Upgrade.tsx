async function handleUpgrade() {
    const res = await fetch('/payment/create-order', {
        method: 'POST',
        credentials: 'include',
    })

    const order = await res.json()

    const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: 'NutReBirth',
        description: 'Premium Subscription',
        order_id: order.orderId,
        handler: function (response: any) {
            // TEMP success (we’ll secure this next)
            alert('Payment successful!')
        },
        theme: {
            color: '#0ea5a0',
        },
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.open()
}


export default function Upgrade() {
    return (
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <h2>Upgrade to Premium</h2>

            <p className="text-muted mt-2">
                Get personalised nutrition plans, full meal charts, and premium insights.
            </p>

            <div className="grid-2 mt-4">
                {/* FREE */}
                <div className="card">
                    <h3>Free</h3>
                    <p className="text-muted mt-1">₹0 / forever</p>

                    <ul className="feature-list mt-3">
                        <li>✔ BMR & TDEE calculation</li>
                        <li>✔ Protein target</li>
                        <li>✔ Basic recommendations</li>
                        <li className="muted">✖ Full meal plans</li>
                        <li className="muted">✖ Weekly structure</li>
                    </ul>
                </div>

                {/* PREMIUM */}
                <div className="card premium-highlight">
                    <h3>Premium</h3>
                    <p className="price mt-1">₹199 / month</p>

                    <ul className="feature-list mt-3">
                        <li>✔ Everything in Free</li>
                        <li>✔ Full diet plans (1600–2800 kcal)</li>
                        <li>✔ Veg / Non-veg choice</li>
                        <li>✔ Future meal logging</li>
                        <li>✔ Priority features</li>
                    </ul>

                    <button className="primary mt-4" onClick={handleUpgrade}>
                        Upgrade to Premium
                    </button>


                    <p className="text-muted mt-2" style={{ fontSize: 12 }}>
                        Secure payment • Cancel anytime
                    </p>
                </div>
            </div>
        </div>
    )
}
