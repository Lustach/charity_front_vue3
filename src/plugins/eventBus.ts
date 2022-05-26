import mitt from 'mitt'
type Events = {
    filterCol: ()=> Promise<any>
};
export default mitt<Events>();
