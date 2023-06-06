import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';

export default function Home() {
  const queryClient = useQueryClient();
  const [text, setText] = useState('');

  const { mutate, isFetching, isSuccess, data } = useMutation({
    mutationFn: async () => {
      const request = await axios.post(
        'http://localhost:5000/single-hate-prediction',
        { text }
      );

      return request.data;
    },
  });

  const onFormSubmit = (event) => {
    event.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  });

  return (
    <form class="h-100 bg-white dark:bg-gray-800" onSubmit={onFormSubmit}>
      <div class="z-20 mx-auto my-auto w-full px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
        <h2 class="text-4xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span class="block">Filipino Hate Speech Detector</span>
        </h2>
        <span class="mx-auto my-2 block w-4/5 text-justify text-xl font-medium text-gray-500">
          Fostering a Safer Online Space: Empowering Users to Detect Filipino
          Hate Speech (English, Taglish, Tagalog). Our advanced tool utilizes
          powerful algorithms and machine learning to analyze text and speech
          inputs, enabling accurate identification and flagging of potential
          instances of hate speech in English, Taglish, and Tagalog content.
          Together, we strive to create an inclusive digital environment by
          empowering individuals and organizations to proactively address hate
          speech and promote online safety.
        </span>
        <label class="text-gray-700" for="name">
          <textarea
            class="m-3 w-4/5 flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-lg font-bold text-gray-700 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
            id="comment"
            placeholder="Enter your comment"
            value={text}
            onInput={(event) => setText(event.target.value)}
            name="comment"
            rows="5"
            cols="40"></textarea>
        </label>

        {isFetching && (
          <div>
            <div class="mx-auto h-24 w-60 rounded-md border-2">
              <div class="flex h-full animate-pulse flex-row items-center justify-center space-x-5">
                <div class="h-12 w-12 rounded-full bg-gray-300 "></div>
                <div class="flex flex-col space-y-3">
                  <div class="h-6 w-36 rounded-md bg-gray-300 "></div>
                  <div class="h-6 w-24 rounded-md bg-gray-300 "></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isSuccess && (
          <div class="mx-auto w-4/5 rounded-sm ease-in">
            {!data.is_hate_speech ? (
              <div
                class="border-l-4 border-green-600 bg-green-200 p-4 text-green-600"
                role="alert">
                <p class="text-xl font-bold">Looks Safe</p>
                <p>Congratulations, you are the best player.</p>
              </div>
            ) : (
              <div
                class="border-l-4 border-red-300 bg-red-200 p-4 text-red-600"
                role="alert">
                <p class="font-bold">Hate Speech</p>
                <p>Something not ideal might be happening.</p>
              </div>
            )}
          </div>
        )}
        <div class="lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <input
              type="submit"
              class="text-md mt-3 w-full rounded-lg bg-indigo-600 px-16 py-4 text-center font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
              value="Analyze for Hate Speech"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
