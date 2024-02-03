import { useMutation, useQuery } from "@tanstack/react-query";

export const useQueries = (queryKey = [], queryFn, onSuccess, onError) => {
  return useQuery({
    queryKey,
    queryFn,
    onSuccess,
    onError,
  });
};

export const useMutate = (mutateFn, onSuccess, onError) => {
  return useMutation({
    mutationFn: (reqBody) => mutateFn({ ...reqBody }),
    onSuccess,
    onError,
  });
};
