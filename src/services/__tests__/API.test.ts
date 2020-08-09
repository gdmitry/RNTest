import API from "../API";

test("should return pictures list", async () => {
  const mock = jest.fn();
  mock.mockReturnValueOnce({ pictures: [{ id: 1, url: "" }] });
  API.request = mock;
  const data = await API.getPictures(1);

  expect(data).toEqual([{ id: 1, url: "" }]);
  expect(API.request).toBeCalled();
});
