import { ContentPage } from '../layouts/ContentPage';

export function AboutUs() {
    return (
        <ContentPage
            title="About ySale"
            subtitle="We're on a mission to make ad management simple"
        >
            <h2>Our Story</h2>
            <p>Founded in 2024, ySale was born from a simple frustration: managing ads across multiple platforms was way too complicated. We've built a tool that agencies and marketers actually enjoy using.</p>

            <h2>Our Mission</h2>
            <p>Make advertising accessible and profitable for businesses of all sizes. We believe that powerful ad optimization tools shouldn't cost a fortune or require a PhD to use.</p>

            <h2>Our Team</h2>
            <p>We're a small team of engineers, designers, and marketers who are passionate about making advertising better. We use ySale ourselves every day to run our own campaigns.</p>

            <h2>Why ySale?</h2>
            <p>Unlike other platforms that nickel-and-dime you with features, we believe in transparent pricing and giving you all the tools you need from day one. No hidden fees, no feature gates.</p>
        </ContentPage>
    );
}
