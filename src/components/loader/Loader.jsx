import { Dna } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Dna
      visible={true}
      height="250"
      width="250"
      ariaLabel="dna-loading"
      wrapperStyle={{
        marginTop: '25%',
        position: 'sticky',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',

        transform: 'translate(-50%, -50%)',
      }}
      wrapperClass="dna-wrapper"
    />
  );
};
