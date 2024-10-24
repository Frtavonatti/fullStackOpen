import Header from '../components/Header';
import Content from '../components/content/Content';
import Footer from '../components/Footer';

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Footer parts={course.parts} />
        </>
    )
}

export default Course