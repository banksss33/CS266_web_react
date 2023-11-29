import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import InputBox from './InputBox';

describe('Should able to show input', () => {
it('renders InputBox component', () => {
  const { getByLabelText, getByPlaceholderText } = render(
    <InputBox
      laBel="Test Label"
      placeholder="Test Placeholder"
      dataType="weight"
      handleValidation={() => {}}
      setValue={() => {}}
      reset={false}
    />
  );
  const inputElement = getByPlaceholderText(/Test Placeholder/i);
  if (inputElement.dataType == "weight"){
    expect(inputElement).toBeInTheDocument();}
  });
 })
describe('Should handles input change and sets value', () => {
it('handles input change and sets value', () => {
  let testValue = '';
  const { getByPlaceholderText } = render(
    <InputBox
      laBel="Test Label"
      placeholder="Test Placeholder"
      dataType="height"
      handleValidation={() => {}}
      setValue={(value) => (testValue = value)}
      reset={false}
    />
  );
  const inputElement = getByPlaceholderText(/Test Placeholder/i);
  fireEvent.change(inputElement, { target: { value: '170' } });
  expect(testValue).toBe('170');
    });
 })


describe('Should validates invaild input and send Err messages', () => {
it('validates input for weight', () => {
  const mockHandleValidation = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <InputBox
      laBel="Test Label"
      placeholder="Test Placeholder"
      dataType="weight"
      handleValidation={mockHandleValidation}
      setValue={() => {}}
      reset={false}
    />
  );
  const inputElement = getByPlaceholderText(/Test Placeholder/i);
  fireEvent.change(inputElement, { target: { value: '900' } });
  fireEvent.blur(inputElement);
  expect(getByText('Please enter a valid weight')).toBeInTheDocument();
});
    it('validates input for Height', () => {
    const mockHandleValidation = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <InputBox
        laBel="Test Label"
        placeholder="Test Placeholder"
        dataType="height"
        handleValidation={mockHandleValidation}
        setValue={() => {}}
        reset={false}
      />
    );
    const inputElement = getByPlaceholderText(/Test Placeholder/i);
    fireEvent.change(inputElement, { target: { value: '900' } });
    fireEvent.blur(inputElement);
    expect(getByText('Please enter a valid height')).toBeInTheDocument();
        });
    it('validates input with Character/Texts', () => {
    const mockHandleValidation = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <InputBox
        laBel="Test Label"
        placeholder="Test Placeholder"
        dataType="height"
        handleValidation={mockHandleValidation}
        setValue={() => {}}
        reset={false}
      />
    );
    const inputElement = getByPlaceholderText(/Test Placeholder/i);
    fireEvent.change(inputElement, { target: { value: 'hello' } });
    fireEvent.blur(inputElement);
    expect(getByText('Please enter a valid height')).toBeInTheDocument();
    //expect(mockHandleValidation).toHaveBeenCalledWith('weight', false);
        });
    })

// Add similar tests for height and age validations as needed
