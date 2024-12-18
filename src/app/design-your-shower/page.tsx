'use client'

import { DesignToolLayout, ProductSelection } from '@/components/shared/design-estimate-tool/layout/DesignToolLayout'
import { useState } from 'react'
import { ProjectTypeStep } from '@/components/shared/design-estimate-tool/steps/project-type/ProjectTypeStep'
import { ShapeStep } from '@/components/shared/design-estimate-tool/steps/shape/ShapeStep'
import { PlumbingStep } from '@/components/shared/design-estimate-tool/steps/plumbing/PlumbingStep'
import { BaseStep } from '@/components/shared/design-estimate-tool/steps/base/BaseStep'

const steps = [
  { id: 'project-type', title: 'Project Type', isComplete: false },
  { id: 'shape', title: 'Shape', isComplete: false },
  { id: 'plumbing', title: 'Plumbing', isComplete: false },
  { id: 'base', title: 'Base', isComplete: false },
  { id: 'walls', title: 'Walls', isComplete: false },
  { id: 'fixtures', title: 'Fixtures', isComplete: false },
  { id: 'accessories', title: 'Accessories', isComplete: false },
  { id: 'review', title: 'Review', isComplete: false }
]

export default function Page() {
  const [currentStepId, setCurrentStepId] = useState(steps[0].id)
  const [selections, setSelections] = useState<ProductSelection[]>([])
  const [projectType, setProjectType] = useState<'tub-to-shower' | 'shower-replacement'>()
  const [selectedShape, setSelectedShape] = useState<string>()
  const [selectedPlumbing, setSelectedPlumbing] = useState<string>()

  const handleProjectTypeSelect = (type: 'tub-to-shower' | 'shower-replacement') => {
    setProjectType(type)
    setCurrentStepId(steps[1].id)
  }

  const handleShapeSelect = (shapeId: string) => {
    setSelectedShape(shapeId)
    setCurrentStepId(steps[2].id)
  }

  const handlePlumbingSelect = (plumbingId: string) => {
    setSelectedPlumbing(plumbingId)
    setCurrentStepId(steps[3].id)
  }

  const handleBaseSelect = (baseProduct: ProductSelection['product']) => {
    setSelections(prev => [
      ...prev.filter(s => s.category !== 'base'),
      { category: 'base', product: baseProduct }
    ])
    setCurrentStepId(steps[4].id)
  }

  const renderStepContent = () => {
    switch (currentStepId) {
      case 'project-type':
        return <ProjectTypeStep onSelect={handleProjectTypeSelect} selectedType={projectType} />
      case 'shape':
        return projectType ? (
          <ShapeStep 
            onSelect={handleShapeSelect} 
            selectedShapeId={selectedShape}
            projectType={projectType}
          />
        ) : null
      case 'plumbing':
        return projectType ? (
          <PlumbingStep
            onSelect={handlePlumbingSelect}
            selectedPlumbingId={selectedPlumbing}
            projectType={projectType}
          />
        ) : null
      case 'base':
        return projectType ? (
          <BaseStep
            onSelect={handleBaseSelect}
            selectedBaseId={selections.find(s => s.category === 'base')?.product.id}
            projectType={projectType}
            shapeId={selectedShape}
          />
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="page-standard">
      <DesignToolLayout
        steps={steps}
        currentStepId={currentStepId}
        onStepChange={setCurrentStepId}
        selections={selections}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            {steps.find(s => s.id === currentStepId)?.title}
          </h2>
          {renderStepContent()}
        </div>
      </DesignToolLayout>
    </div>
  )
}
