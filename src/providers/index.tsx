import Gluestack from './Gluestack';
import QueryClient from './QueryClient';
import Redux from './Redux';
import Routes from './Routes';

export default function Providers() {
  return (
    <Redux>
      <QueryClient>
        <Gluestack>
          <Routes />
        </Gluestack>
      </QueryClient>
    </Redux>
  );
}
