import { render, screen,fireEvent,waitForElement  } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom'
import BMR from './BMR';

/*spec 
1.display (render without err)
2. input onchange?
3. enter valid input and right result + picture
4. handle invaild input
*/



describe('Display correctly BMR page', () => {  // Display BMI calculator
    it('Should have a heading with the text "BMI Calculator"', () => {
      render(<BMR />);
      const headingText = screen.getByText('BMR');
      expect(headingText).toBeInTheDocument();
    });
    
    // it('Should have right description', () => {
    //   const { getByText } = render(<BMR/>);
    //   // Assert that the text is present in the rendered component
    //   const textElement = getByText(
    //     "Let's calculate your Body Mass Index. Type the values below"
    //   );
    //   expect(textElement).toBeInTheDocument();
    // });

   it('Should have a Weight input', () => {
    render(<BMR />);
      const inputWeight = screen.getByPlaceholderText('Weight (in kg)');
      expect(inputWeight).toBeInTheDocument();
    });
    it('Should Have Height input', () => {
      render(<BMR />);
       const inputHeight = screen.getByPlaceholderText('Height (in cm)')
       expect(inputHeight).toBeInTheDocument();
    })/*
    it('Should Have Select Activities ', () => {
      render(<BMR />);
       const button = screen.getByText('Calculate')
       expect(button).toBeInTheDocument();
    })*/
    it('Should Have Calculate Button', () => {
        render(<BMR />);
         const button = screen.getByText('Calculate')
         expect(button).toBeInTheDocument();
      })
   })
   describe ('Test react-select component', () => {
    const mockedOptions = [
        {label: 'Mocked option 1', value: 'mocked-option-1'},
        {label: 'Mocked option 2', value: 'mocked-option-2'},
        {label: 'Mocked option 3', value: 'mocked-option-3'},
        {label: 'Mocked option 4', value: 'mocked-option-4'},
        {label: 'Mocked option 5', value: 'mocked-option-5'},
        {label: 'Mocked option 6', value: 'mocked-option-6'},
        {label: 'Mocked option 7', value: 'mocked-option-7'},
        {label: 'Mocked option 8', value: 'mocked-option-8'},
        {label: 'Mocked option 9', value: 'mocked-option-9'},
        {label: 'Mocked option 10', value: 'mocked-option-10'},
    ];

    it('should render without errors', async () => {
        const mockedOnChange = jest.fn();
        const { getByText } = render(<BMR 
            options={mockedOptions} 
            onChange={mockedOnChange} />);

        const placeholder = getByText('Select an option');

        expect(placeholder).toBeTruthy();
    });

    it('should call onChange when the first option is selected', async () => {
        const mockedOnChange = jest.fn();
        const { getByText, queryByTestId } = render(<BMR 
            options={mockedOptions} 
            onChange={mockedOnChange} />);

        const mySelectComponent = queryByTestId('my-select-component');

        expect(mySelectComponent).toBeDefined();
        expect(mySelectComponent).not.toBeNull();
        expect(mockedOnChange).toHaveBeenCalledTimes(0);

        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await waitForElement(() => getByText('Mocked option 1'));
        fireEvent.click(getByText('Mocked option 1'));

        expect(mockedOnChange).toHaveBeenCalledTimes(1);
        expect(mockedOnChange).toHaveBeenCalledWith({label: 'Mocked option 1', value: 'mocked-option-1'});

    });

    it('should call onChange when the first option is selected then second option then the 9th one', async () => {
        const mockedOnChange = jest.fn();
        const { getByText, queryByTestId } = render(<BMR 
            options={mockedOptions} 
            onChange={mockedOnChange} />);

        const mySelectComponent = queryByTestId('my-select-component');

        expect(mySelectComponent).toBeDefined();
        expect(mySelectComponent).not.toBeNull();
        expect(mockedOnChange).toHaveBeenCalledTimes(0);

        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await waitForElement(() => getByText('Mocked option 1'));
        fireEvent.click(getByText('Mocked option 1'));

        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await waitForElement(() => getByText('Mocked option 2'));
        fireEvent.click(getByText('Mocked option 2'));

        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await waitForElement(() => getByText('Mocked option 9'));
        fireEvent.click(getByText('Mocked option 9'));

        expect(mockedOnChange).toHaveBeenCalledTimes(3);
        expect(mockedOnChange).toHaveBeenCalledWith({label: 'Mocked option 9', value: 'mocked-option-9'});
    });

    it('should call onChange when filtering by input value', async () => {
      const mockedOnChange = jest.fn();
      const { getByText, queryByTestId, container } = render(<BMR 
        options={mockedOptions} 
        onChange={mockedOnChange} />);

        const mySelectComponent = queryByTestId('my-select-component');

        fireEvent.change(container.querySelector('input'), {
            target: { value: 'option 1' },
        });

        // select Mocked option 1
        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });  
        // select Mocked option 10
        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });

        await waitForElement(() => getByText('Mocked option 10'));
        fireEvent.click(getByText('Mocked option 10'));

        expect(mockedOnChange).toHaveBeenCalledTimes(1);
        expect(mockedOnChange).toHaveBeenCalledWith({label: 'Mocked option 10', value: 'mocked-option-10'});
    });

});