import type { ReferenceResponse } from '../types/exercise.types'

interface BodyExplorerProps {
    bodyParts: ReferenceResponse[]
    selectedBodyPartId: string | null
    onSelectBodyPart: (bodyPartId: string) => void
}

export function BodyExplorer({
                                 bodyParts,
                                 selectedBodyPartId,
                                 onSelectBodyPart,
                             }: BodyExplorerProps) {
    return (
        <aside className="exercises-body-explorer">
            <div className="exercises-body-explorer-header">
                <span>BODY EXPLORER</span>

                <div className="exercises-body-explorer-view-toggle">
                    <button
                        type="button"
                        className="exercises-body-explorer-view-active"
                    >
                        Front
                    </button>

                    <button type="button">
                        Back
                    </button>
                </div>
            </div>

            <div className="exercises-body-explorer-model">
                <div className="exercises-body-explorer-placeholder">
                    <span>3D BODY MODEL</span>

                    {bodyParts.map((bodyPart) => (
                        <button
                            key={bodyPart.id}
                            type="button"
                            className={`exercises-body-part-point ${
                                selectedBodyPartId === bodyPart.id
                                    ? 'exercises-body-part-selected'
                                    : ''
                            }`}
                            onClick={() =>
                                onSelectBodyPart(bodyPart.id)
                            }
                        >
                            <span />
                            <small>{bodyPart.name}</small>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}