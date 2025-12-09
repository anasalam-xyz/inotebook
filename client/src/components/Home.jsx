import Notes from "./Notes";

export default function Home({showAlert}) {
    return (
        <div className="my-2">
            <Notes showAlert={showAlert}/>
        </div>
    )
}
