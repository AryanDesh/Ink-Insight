import { atom } from "recoil";
import { OutputData } from "@editorjs/editorjs";

// Function to generate initial data
export const initialData = (): OutputData => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "...",
          level: 1,
        },
      },
    ],
  };
};

export const editorContent = atom<OutputData>({
  key: "editorData",
  default: initialData(),
});

export const sidebarExpanded = atom<boolean>({
    key: "expanded",
    default: true
});

/*
Basics:
Atoms, useRecoilState, useRecoilValue,useSetRecoilState,selectors, async data queries

Advance: 
atomfamily, selector family, useRecoilStateLoadable, useRecoilValueLoadable.

Atom:
    For state management, rather than using state variables, we use atoms in Recoil.
    To access Recoil components in a functions the components are to be wrapped inside a RecoilRoot component.
    useRecoilValue hook to get the atoms value.
    useSetRecoilState hook to just get the function to update the state variable.
    useRecoilState hook to get a recoilValue variable and a function to update the state variable(like useState);

Selectors:
    it is something that can be derived from other atoms.
    It mostly takes over the role of useMemo when the dependency of useMemo is on Atoms.
    It is slightly better as u can use selectors as input for other selectors as well.

Async data queries:
    default values of atoms have to be synchronous, so we need to use async selectors into atoms.
    eg: 
        export const notifications = atom({
            key: "networkAtom",
            default: selector({
                key: "networkSelector",
                get: async () => {
                    const res = await axios.get("https://sum-server.100xdevs.com/notifications")
                    return res.data;
                }
            })
        });

AtomFamily:
    Sometimes u need more than 1 atoms.
    Returns a functions that stores a new atom(basically lets u dynamically create atoms)
    Allows to dynamically create, manage and delete atoms.
    export const todosAtomFamily = atomFamily({
        key: 'todosAtomFamily',
        default: id => {
            return TODOS.find(x => x.id === id)
        },
    });

    THis is great for managing multiple atoms dynamically can make thing rather complex and prone to issues
    Also helps manage atoms based on their ids, thus removing redundancy.


SelectorFamily:
    Allows u to get data from the server. lets u make asynchronous calls inside an atomfamily.
    This is almost similar to selector but allows u to pass params to the get and set callbacks of a selector.
    Its like a dynamic selector that takes in id as input and returns a functions based on the id parameter.
    eg:        
        export const todosAtomFamily = atomFamily({
        key: 'todosAtomFamily',
        default: selectorFamily({
            key: "todoSelectorFamily",
        
            get: function(id) {
            return async function ({get}) {
                const res = await axios.get(https://sum-server.100xdevs.com/todo?id=${id});
                return res.data.todo;
            }
            }
        })
        })


useRecoilStateLoadable And useRecoilValueLoadable:
    Used to show loaders on the screen while waiting for response from the servers.
    Provides with state attribute, that defines if the api endpoint is done, if its waiting it writes " loading" if the endpointfails "hasError", "hasValue"

*/