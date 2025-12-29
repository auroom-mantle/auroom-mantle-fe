'use client';

import { motion } from 'framer-motion';
import { FAQAccordion, FAQItem } from '@/components/ui/FAQAccordion';

const faqItems: FAQItem[] = [
    {
        question: 'What is AuRoom?',
        answer: 'AuRoom is a digital lending platform that allows you to borrow cash using digital gold (XAUT) as collateral. Like a pawnshop, but 100% online, faster, and with lower fees.',
    },
    {
        question: 'How do I get digital gold (XAUT)?',
        answer: 'You can buy XAUT through crypto exchanges like Tokocrypto, Indodax, or directly on the AuRoom platform using IDRX (Rupiah stablecoin).',
    },
    {
        question: 'What are the fees?',
        answer: 'Service fee is only 0.5% of the loan amount, charged once upon disbursement. No monthly interest or other hidden fees.',
    },
    {
        question: 'Is my gold safe?',
        answer: 'Yes, your gold is secured by a smart contract on the blockchain. No third party can access your gold. Once you repay the loan, the gold automatically returns to your wallet.',
    },
    {
        question: 'How do I repay the loan?',
        answer: 'You can repay anytime without time limits. Simply pay the debt amount, and your gold immediately returns to your wallet.',
    },
    {
        question: 'What happens if I cannot repay?',
        answer: 'If the gold value drops drastically to the liquidation threshold (90% LTV), part of the gold will be automatically sold to repay the debt. But with 30% LTV, you have a very large buffer - gold price would need to drop ~67% before this happens.',
    },
    {
        question: 'What is the maximum I can borrow?',
        answer: 'You can borrow up to 75% of the gold value. But for safety, we set the default at 30% so your position is very safe from liquidation.',
    },
    {
        question: 'Is there a minimum loan amount?',
        answer: 'There is no minimum loan amount. You can borrow according to your needs.',
    },
];

export function FAQSection() {
    return (
        <section className="py-16 md:py-24 lg:py-32 bg-black">
            <div className="max-w-4xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ❓ Frequently Asked Questions
                    </h2>
                    <p className="text-gray-400">
                        Answers to commonly asked questions
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <FAQAccordion items={faqItems} />
            </div>
        </section>
    );
}
