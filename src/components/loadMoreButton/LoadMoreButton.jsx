import { Btn, BtnWrap } from './LoadMoreButton.styled';

export const LoadMoreButton = ({ addImages }) => {
  return (
    <BtnWrap>
      <Btn onClick={addImages}>Load more</Btn>
    </BtnWrap>
  );
};
