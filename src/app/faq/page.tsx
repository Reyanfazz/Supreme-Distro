'use client';

import React from 'react';

const faq = [
  {
    question: 'How long will it take for my order to arrive?',
    answer:
      'Orders are typically delivered within 2-4 working days. You’ll receive a confirmation email with estimated delivery times once your order is placed.',
  },
  {
    question: 'Can I track my order?',
    answer:
      'Yes, once your order is dispatched, you will receive an email with a tracking link to monitor your delivery status.',
  },
  {
    question: 'What are the shipping options?',
    answer:
      'We offer Standard and Express delivery options at checkout. Shipping times and fees will be displayed based on your location.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept major credit/debit cards including Visa, MasterCard, and AMEX, as well as PayPal and Apple Pay.',
  },
  {
    question: 'Will I receive an invoice with my order?',
    answer:
      'Yes, a detailed invoice will be sent to your email after your order is confirmed. You can also access it from your account dashboard.',
  },
  {
    question: 'What should I do if I receive the wrong order?',
    answer:
      'We’re sorry for the inconvenience. Please contact our support team within 48 hours and we’ll arrange a replacement or refund.',
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-white">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faq.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold text-white mb-2">{faq.question}</h2>
            <p className="text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
