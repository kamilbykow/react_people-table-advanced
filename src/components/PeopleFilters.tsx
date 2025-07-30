import classNames from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const menCN = classNames({
    'is-active': searchParams.get('sex') === 'm',
  });

  const femaleCN = classNames({
    'is-active': searchParams.get('sex') === 'f',
  });

  const getCenturiesLink = (cent: string) => {
    if (!searchParams.getAll('centuries').includes(cent)) {
      searchParams.append('centuries', cent);

      setSearchParams(searchParams);
    } else {
      searchParams.delete('centuries', cent);
      setSearchParams(searchParams);
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!searchParams.get('sex') ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink className={menCN} params={{ sex: 'm' }}>
          Male
        </SearchLink>
        <SearchLink className={femaleCN} params={{ sex: 'f' }}>
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              searchParams.set('query', e.target.value);
              setSearchParams(searchParams);

              if (e.target.value.length === 0) {
                searchParams.delete('query');
                setSearchParams(searchParams);
              }
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('16') && 'is-info'}`}
              onClick={() => getCenturiesLink('16')}
            >
              16
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('17') && 'is-info'}`}
              onClick={() => getCenturiesLink('17')}
            >
              17
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('18') && 'is-info'}`}
              onClick={() => getCenturiesLink('18')}
            >
              18
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('19') && 'is-info'}`}
              onClick={() => getCenturiesLink('19')}
            >
              19
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('20') && 'is-info'}`}
              onClick={() => getCenturiesLink('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={`button ${searchParams.get('centuries') ? 'is-outlined' : 'is-success'}`}
              onClick={() => {
                searchParams.delete('centuries');
                setSearchParams(searchParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            setQuery('');

            searchParams.delete('sex');
            searchParams.delete('query');
            searchParams.delete('centuries');

            setSearchParams(searchParams);
          }}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
