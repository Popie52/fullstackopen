import type { CoursePart } from "../App";

interface PartProps {
    part: CoursePart;
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled part kind: ${JSON.stringify(value)}`);
}

const Part = ({part}: PartProps) => {
    switch(part.kind) {
        case "basic":
            return (<div>
                <strong>{part.name} {part.exerciseCount}</strong>
                <p><em>{part.description}</em></p>
            </div>);
        case "group":
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong>
                    <p>Project exercises: {part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong>
                    <p><em>{part.description}</em></p>
                    <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
                </div>
            );
        case "special":
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong>
                    <p><em>{part.description}</em></p>
                    <p>Requirements: {part.requirements.join(", ")}</p>
                </div>
            );
        default:
            return assertNever(part);

    }
}

export default Part