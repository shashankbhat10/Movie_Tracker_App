import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PersonCredits = ({ credits }) => {
  const [contentByYear, updateContent] = useState({});

  useEffect(() => {
    const content = credits.cast
      .map((item) => {
        return {
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
        };
      })
      .sort((a, b) => {
        return b.date - a.date;
      })
      .reduce((groups, item) => {
        const group = groups[parseInt(item.date.slice(0, 5))] || [];
        group.push(item);
        groups[parseInt(item.date.slice(0, 5))] = group;
        return groups;
      }, {});

    console.log(content);
    updateContent(content);
  }, [credits]);

  return (
    <div>
      <h5 className="mt-3">Acting</h5>
      <Container>
        {Object.keys(contentByYear)
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
                    {contentByYear[year].map((content) => {
                      return (
                        <div
                          key={`person_credit_${content.type}_${content.id}`}
                          style={{ fontSize: '0.9em' }}
                        >
                          <Link
                            to={
                              (content.type === 'movie' ? '/movie/' : '/tv/') +
                              content.id
                            }
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            <strong className="mr-2">{content.title}</strong>
                          </Link>{' '}
                          as{' '}
                          <span className="text-muted">
                            {content.character}{' '}
                          </span>
                          {content.episode_count && (
                            <span className="text-muted">
                              ({content.episode_count} episodes)
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {/* <strong>{item.title}</strong> as {item.character}{' '}
                  {item.episode_count && (
                    <span>({item.episode_count} episodes)</span>
                  )} */}
                  </Col>
                </Row>
                <hr style={{ width: '90%' }} className="my-1" />
              </div>
            );
          })}
      </Container>
    </div>
  );
};

export default PersonCredits;
