import React, {useState, useEffect} from 'react';
import {Container, Image, Button} from "semantic-ui-react";
import {map} from "lodash";
import {Course as CourseController} from "../../../api";
import {image} from "../../../assets";
import {Courses as CoursesCt} from "../../../components/Web";
import "./Courses.scss";

const courseController = new CourseController();

export function Courses() {
    const [courses, setCourses] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const isCurrentLastPage = pagination?.page === pagination?.pages

    useEffect(() => {
        (async () => {
            try {
                const response = await courseController.getCourses({page , limit: 6});
                setPagination({
                    page: response.page,
                    pages: response.pages,
                });

                if(!courses) setCourses(response.docs)
                else setCourses([...courses, ...response.docs]);

            } catch (error) {
                throw error;
            }
        })()
    }, [page]);

    const loadMore = () => {
        setPage((prevState) => prevState + 1);
    }

    return (
        <Container className="courses-page">
            <Image src={image.academyLogo} />
            <h2>
                En la web vas a encontrar los mejores cursos online de programación en
                Español. Unete a nosotros y empieza tu camino como programador Frontend
                o Backend.
            </h2>

            <div className="courses">
                {map(courses, (course) => (
                    <div key={course._id} className="courses__item">
                         <CoursesCt.Course course={course} />{/* Esta exportacion/importacion de mrda me daba puros errores nomas */}
                    </div>
                ))}
            </div>

           {!isCurrentLastPage && (
               <div className="more">
                  <Button primary onClick={loadMore}>
                    Cargar Más
                  </Button>
               </div>
           )}
        </Container>
    );
}
