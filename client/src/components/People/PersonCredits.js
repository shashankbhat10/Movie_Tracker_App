import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PersonCredits = ({ credits }) => {
  const [contentByYear, updateContent] = useState({});
  const [departments, updateDepartments] = useState([]);
  const [selectedDept, changeDept] = useState(null);

  useEffect(() => {
    let contentList = {};
    let deptList = [];
    if (credits.cast.length !== 0) {
      changeDept('Acting');
      deptList.push('Acting');
      const content = credits.cast
        .filter(
          (item, index, self) =>
            index === self.findIndex((obj) => obj.id === item.id)
        )
        .reduce((result, item) => {
          if (item.character !== '') {
            result.push({
              type: item.media_type,
              id: item.id,
              title: item.media_type === 'movie' ? item.title : item.name,
              date:
                item.media_type === 'movie'
                  ? item.release_date
                  : item.first_air_date,
              character: item.character,
              episode_count:
                item.media_type !== 'movie' ? item.episode_count : null,
            });
          }
          return result;
        }, [])
        .sort((a, b) => {
          return b.date - a.date;
        })
        .reduce((groups, item) => {
          const date =
            item.date === undefined
              ? 'undated'
              : parseInt(item.date.slice(0, 5));
          const group = groups[date] || [];
          group.push(item);
          groups[date] = group;
          return groups;
        }, {});
      contentList['Acting'] = content;
    }
    if (credits.crew.length !== 0) {
      const department = [
        ...new Set(credits.crew.map((item) => item.department)),
      ];

      department.forEach((dept) => {
        deptList.push(dept);
        const list = credits.crew
          .filter((item) => item.department === dept)
          .filter(
            (item, index, self) =>
              index === self.findIndex((obj) => obj.id === item.id)
          )
          .reduce((result, item) => {
            if (item.job !== '') {
              result.push({
                type: item.media_type,
                id: item.id,
                title: item.media_type === 'movie' ? item.title : item.name,
                date:
                  item.media_type === 'movie'
                    ? item.release_date
                    : item.first_air_date,
                job: item.job,
                episode_count:
                  item.media_type !== 'movie' ? item.episode_count : null,
              });
            }
            return result;
          }, [])
          .sort((a, b) => {
            return b.date - a.date;
          })
          .reduce((groups, item) => {
            const date =
              item.date === undefined
                ? 'undated'
                : parseInt(item.date.slice(0, 5));
            const group = groups[date] || [];
            group.push(item);
            groups[date] = group;
            return groups;
          }, {});
        contentList[dept] = list;
      });
    }

    updateDepartments(deptList);
    updateContent(contentList);
  }, [credits]);

  return (
    <div className="mt-3">
      {contentByYear[selectedDept] !== undefined && (
        <div>
          <h4>Credits</h4>

          <div className="d-flex flex-row flex-wrap pt-2 mb-2">
            {departments.map((item, index) => {
              return (
                <h5
                  className="px-2 pb-1"
                  style={{
                    width: 'auto',
                    borderBottom: item === selectedDept && '2px solid green',

                    // transition: 'border 0.3s ease-in-out',
                  }}
                  onClick={() => changeDept(item)}
                >
                  <span className="px-1" style={{ cursor: 'pointer' }}>
                    {item}
                  </span>
                </h5>
              );
            })}
          </div>
          <Container>
            {Object.keys(contentByYear[selectedDept])
              .sort((a, b) => {
                return b - a;
              })
              .map((year) => {
                return (
                  <div key={`person_credit_year_${year}`}>
                    <Row>
                      <Col
                        md={2}
                        lg={1}
                        style={{ fontSize: '0.8em' }}
                        className="text-nowrap"
                      >
                        <strong>{isNaN(year) ? 'Undated' : year}</strong>
                      </Col>
                      <Col md={10} lg={11}>
                        {contentByYear[selectedDept][year].map((content) => {
                          return (
                            <div
                              key={`person_credit_${content.type}_${content.id}`}
                              style={{ fontSize: '0.9em' }}
                            >
                              <Link
                                to={
                                  (content.type === 'movie'
                                    ? '/movie/'
                                    : '/tv/') + content.id
                                }
                                style={{
                                  textDecoration: 'none',
                                  color: 'black',
                                }}
                              >
                                <strong className="mr-2">
                                  {content.title}
                                </strong>
                              </Link>{' '}
                              as{' '}
                              <span className="text-muted">
                                {selectedDept === 'Acting'
                                  ? content.character
                                  : content.job}{' '}
                              </span>
                              {content.episode_count && (
                                <span className="text-muted">
                                  ({content.episode_count} episodes)
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </Col>
                    </Row>
                    <hr style={{ width: '90%' }} className="my-1" />
                  </div>
                );
              })}
          </Container>
        </div>
      )}
    </div>
  );
};

export default PersonCredits;
