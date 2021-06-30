import c from 'classnames';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { If } from '../../Common/Form/If';
import { MultipleChoice, Option, SingleChoice } from '../../Common/Form/NewChoiceField';
import { Files } from '../../Common/Form/NewFile';
import { Form, Section } from '../../Common/Form/NewForm';
import { LongText, Number, ShortText } from '../../Common/Form/NewTextField';
import { Note, useFieldContext, Warning, Question } from '../../Common/Form/Question';

export const Demo = (
  <Form>
    <Section title="Demo of the form components">
      <SingleChoice q="What kind of input do you need from the user?" id="Component Choice">
        <Option value="Freeform text">
          <ShortText q="We have a text component for a few words" id="Short Text Component" />
          <LongText
            q="...or, if needed, a bigger one for a paragraph or two"
            id="Long Text Component"
          />
        </Option>
        <Option value="Number">
          <Number
            q="When you need your users to specify sample mass, or other quantity"
            id="Number Component"
          />
          <Note>Also try entering something that isn't a number</Note>
        </Option>
        <Option value="Exactly one thing from a predefined list">
          <Note>
            You're using a single choice component right now! And this is a Note component, by the
            way.
          </Note>
          <Warning>
            ...and we have warning components as well, when you need them. Don't use them
            willy-nilly, though.
          </Warning>
        </Option>
        <Option value="One or more things from a predefined list">
          <MultipleChoice
            q="When a single choice component doesn't cut it"
            id="Multuple Choice Component"
          >
            <Option value="Select me" />
            <Option value="...and me as well" />
            <Option value="NOT ME I DARE YOU">
              <Note>You like to live dangerously. I like it.</Note>
            </Option>
            <Option value="...but me you can" />
          </MultipleChoice>
        </Option>
        <Option value="One or more files">
          <Files q="When you need your users to upload gel images, or other" id="Files Component" />
        </Option>
      </SingleChoice>
    </Section>

    <Section title="Component configuration">
      <SingleChoice
        q="Would you like to learn more about the component configuration?"
        id="Component Configuration Choice"
      >
        <Option value="Required and optional fields">
          <Note>
            By default, every form field is required — that means the users (i.e. the 'clients')
            won't be able to send the request unless they fill them all in.
          </Note>

          <Note>
            When you want a field to be optional, you need to mark it so in the code. Every
            component (text, number, single choice, ...) can be made optional.
          </Note>

          <ShortText
            q="This text field is optional. See the little icon to the right?"
            id="Optional Text Field"
            optional
          />
        </Option>

        <Option value="Custom options in single and multiple choice components">
          <Note>
            By default, single and multiple choice fields DON'T allow users to input their own
            values. However, sometimes you — the form designer — can't list every possible option,
            and in that case, the ability to support user-input values will come useful.
          </Note>

          <Note>
            In the code, you can mark that a single or multiple choice field has support for custom
            values. There is a little icon signaling this to the user.
          </Note>

          <SingleChoice
            q="Choose one of our options, or write your own"
            id="Custom Single Choice"
            hasCustom
          >
            <Option value="A" />
            <Option value="B" />
            <Option value="C" />
          </SingleChoice>
        </Option>
      </SingleChoice>
    </Section>
    <Section title="Advanced usage (bonus)">
      <Note>
        If you've read the source code of this form, you probably noticed that all of the form
        components have an id attribute. The id of a field can be used to check the value of that
        particular field from another place in the form.
        <br />
        <br />
        <strong>Use this sparringly</strong> (by the way, see, we can do plain old HTML here)
      </Note>

      <If
        condition={get => get('Number Component') === '42'}
        orElse={
          <Warning>
            You didn't enter 42 in the number field in the first section. Try again.
          </Warning>
        }
      >
        <Note>
          You <em>did</em> enter 42 in the number field above, great!
        </Note>
        <ShortText q="Now, what was the question again?" id="Life, the Universe, and Everything" />
      </If>

      <Note>
        If you're feeling adventurous, you also can write your own components. Look at NewFile.tsx
        for more info.
      </Note>

      <ThreeButtons q="Push one of the three buttons" id="Custom Component Demo" />
    </Section>
  </Form>
);

function ThreeButtons({ q, id }: { id: string; q: string }) {
  const { state, values } = useFieldContext();

  switch (state) {
    case 'edit':
      return <ThreeButtonsEditState q={q} id={id} />;
      break;
    case 'show':
      // This is showed on the request page when the request is sent
      return null;
  }
}

function ThreeButtonsEditState({ id, q }: { id: string; q: string }) {
  const { watch, setValue, register, unregister } = useFormContext();
  const currentValue = watch(id, null);

  useEffect(() => {
    register(id);
    setValue(id, null);
    return () => {
      unregister(id);
    };
  }, [register, unregister, id, setValue]);

  return (
    <div className="w-full">
      <Question required>{q}</Question>
      <div className="flex flex-row space-x-3 w-full justify-">
        <button
          type="button"
          className={c(
            'py-4 flex-grow rounded-md',
            currentValue === 'A' ? 'bg-indigo-200' : 'bg-gray-100'
          )}
          onClick={() => {
            setValue(id, 'A');
          }}
        >
          A
        </button>

        <button
          type="button"
          className={c(
            'py-4 flex-grow rounded-md',
            currentValue === 'B' ? 'bg-indigo-200' : 'bg-gray-100'
          )}
          onClick={() => {
            setValue(id, 'B');
          }}
        >
          B
        </button>

        <button
          type="button"
          className={c(
            'py-4 flex-grow rounded-md',
            currentValue === 'C' ? 'bg-indigo-200' : 'bg-gray-100'
          )}
          onClick={() => {
            setValue(id, 'C');
          }}
        >
          C
        </button>
      </div>
    </div>
  );
}
