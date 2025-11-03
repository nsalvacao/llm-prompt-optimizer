import React from 'react';
import { LLM, LLMOption } from './types';

const GeminiLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#4285F4"/>
        <path d="M12 6L10.59 7.41L14.17 11H6V13H14.17L10.59 16.59L12 18L18 12L12 6Z" fill="#34A853"/>
    </svg>
);

const AnthropicLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#D9664B"/>
        <path d="M12 12.28c-1.85 0-3.36-1.5-3.36-3.36s1.5-3.36 3.36-3.36 3.36 1.5 3.36 3.36-1.5 3.36-3.36 3.36zm0-5.72c-1.3 0-2.36 1.06-2.36 2.36s1.06 2.36 2.36 2.36 2.36-1.06 2.36-2.36-1.06-2.36-2.36-2.36z" fill="#D9664B"/>
        <path d="M12 14c-4.41 0-8 1.79-8 4v2h16v-2c0-2.21-3.59-4-8-4zm-6 4v-1.2c.4-.8 2.33-2.8 6-2.8s5.6 2 6 2.8V18H6z" fill="#D9664B"/>
    </svg>
);

const OpenAILogo = () => (
    <svg width="24" height="24" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38.2321 16.2235C38.2321 15.6033 37.9818 15.0093 37.5414 14.5689L26.4311 3.45865C25.3302 2.35772 23.5786 2.35772 22.4777 3.45865L17.5873 8.34913C17.2671 8.66934 17.2671 9.18977 17.5873 9.51L19.5379 11.4606C19.8581 11.7808 20.3785 11.7808 20.6987 11.4606L22.8481 9.31121C23.0082 9.15111 23.2685 9.15111 23.4286 9.31121L28.1389 14.0215C28.299 14.1816 28.299 14.4419 28.1389 14.602L21.2783 21.4626C21.1182 21.6227 20.8579 21.6227 20.6978 21.4626L18.5484 19.3132C18.2282 18.993 17.7078 18.993 17.3876 19.3132L15.437 21.2638C15.1168 21.584 15.1168 22.1044 15.437 22.4246L24.5273 31.5149C25.0677 32.0553 25.8484 32.2455 26.5892 31.9952L37.5414 28.1389C38.5022 27.8287 38.2321 26.4275 37.2713 26.1173L35.2606 25.4971C34.7402 25.337 34.3098 24.9066 34.1497 24.3862L32.7485 19.796C32.5283 19.1157 32.8586 18.4353 33.5389 18.2151L36.8308 17.1444C37.6415 16.8842 38.2321 17.4781 38.2321 16.2235Z" fill="#10A37F"></path>
        <path d="M2.76795 24.7765C2.76795 25.3967 3.01824 25.9907 3.45865 26.4311L14.5689 37.5413C15.6698 38.6423 17.4214 38.6423 18.5223 37.5413L23.4127 32.6509C23.7329 32.3307 23.7329 31.8102 23.4127 31.49L21.4621 29.5394C21.1419 29.2192 20.6215 29.2192 20.3013 29.5394L18.1519 31.6888C17.9918 31.8489 17.7315 31.8489 17.5714 31.6888L12.8611 26.9785C12.701 26.8184 12.701 26.5581 12.8611 26.398L19.7217 19.5374C19.8818 19.3773 20.1421 19.3773 20.3022 19.5374L22.4516 21.6868C22.7718 22.007 23.2922 22.007 23.6124 21.6868L25.563 19.7362C25.8832 19.416 25.8832 18.8956 25.563 18.5754L16.4727 9.48506C15.9323 8.94469 15.1516 8.75451 14.4108 9.0048L3.45865 12.8611C2.49784 13.1713 2.76795 14.5725 3.72875 14.8827L5.73945 15.5029C6.25983 15.663 6.69022 16.0934 6.85032 16.6138L8.25152 21.204C8.47169 21.8843 8.14143 22.5647 7.46111 22.7849L4.16918 23.8556C3.35852 24.1158 2.76795 23.5219 2.76795 24.7765Z" fill="#10A37F"></path>
    </svg>
);

const LlamaLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.23607 20V5.5H8.63207V17.152L14.7921 5.5H18.7641L12.7401 13.84L12.9081 14.128V20H10.1601V13.984L10.0281 13.732L5.23607 20Z" fill="#A07A53"/>
    </svg>
);

export const LLM_OPTIONS: LLMOption[] = [
  { id: LLM.GEMINI, name: 'Gemini', logo: <GeminiLogo /> },
  { id: LLM.ANTHROPIC, name: 'Anthropic (Claude)', logo: <AnthropicLogo /> },
  { id: LLM.CHATGPT, name: 'OpenAI (ChatGPT)', logo: <OpenAILogo /> },
  { id: LLM.LLAMA, name: 'Meta (Llama)', logo: <LlamaLogo /> },
];

export const PROMPT_TEMPLATES = [
    {
        category: 'Content Creation',
        name: 'Summarize Content',
        prompt: 'Summarize the key points from the following text in {{language}}:\n\n{{text}}',
    },
    {
        category: 'Content Creation',
        name: 'Blog Post Idea Generator',
        prompt: 'Generate 5 blog post titles about {{topic}} for an audience of {{audience}}.',
    },
    {
        category: 'Code Generation',
        name: 'Python Function',
        prompt: 'Write a Python function that {{task}}. The function should accept the following arguments: {{arguments}}. It should return {{return_value}}.',
    },
    {
        category: 'Code Generation',
        name: 'SQL Query',
        prompt: 'Write a SQL query to {{objective}} from a table named `{{table_name}}`. The table has the following columns: {{columns}}.',
    },
    {
        category: 'Marketing',
        name: 'Ad Copy',
        prompt: 'Generate 3 variations of ad copy for {{product_name}}. The target audience is {{audience}} and the key benefit is {{benefit}}. The tone should be {{tone}}.',
    }
];