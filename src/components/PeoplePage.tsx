import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const peopleList = [...people];
  let fillterdList = [...peopleList];

  useEffect(() => {
    getPeople()
      .then(json => setPeople(json))
      .then(() => setIsLoading(false))
      .catch(() => setError(true));
  }, []);

  if (searchParams.get('query')) {
    const query: string | undefined = searchParams
      .get('query')
      ?.toLocaleLowerCase();

    if (query) {
      fillterdList = fillterdList.filter(
        person =>
          person.name.toLocaleLowerCase().includes(query) ||
          person.fatherName?.toLocaleLowerCase().includes(query) ||
          person.motherName?.toLocaleLowerCase().includes(query),
      );
    }
  }

  switch (searchParams.get('sex')) {
    case 'm':
      fillterdList = fillterdList.filter(person => person.sex === 'm');
      break;
    case 'f':
      fillterdList = fillterdList.filter(person => person.sex === 'f');
      break;
  }

  switch (searchParams.get('sort')) {
    case 'name':
      fillterdList.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'sex':
      fillterdList.sort((a, b) => a.sex.localeCompare(b.sex));
      break;
    case 'born':
      fillterdList.sort((a, b) => a.born - b.born);
      break;

    case 'died':
      fillterdList.sort((a, b) => a.died - b.died);
      break;
  }

  if (searchParams.get('order') === 'desc') {
    fillterdList.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : isLoading ? (
                <Loader />
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : fillterdList.length > 0 ? (
                <PeopleTable people={fillterdList} slug={slug} />
              ) : (
                <p>There are no people matching the current search criteria</p>
              )}
              {}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
