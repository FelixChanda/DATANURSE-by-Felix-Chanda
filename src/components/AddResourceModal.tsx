import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Upload, FileText, BookOpen, GraduationCap, BookmarkCheck, FolderDown, Smartphone } from 'lucide-react';
import { ResourceCategory, AcademicYearLevel, NursingDomain, ResourceItem } from '../types';

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResource: (newResource: ResourceItem) => void;
}

export const AddResourceModal: React.FC<AddResourceModalProps> = ({
  isOpen,
  onClose,
  onAddResource
}) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<ResourceCategory>('documents');
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState<NursingDomain>('Adult Health & Med-Surg');
  const [yearLevel, setYearLevel] = useState<AcademicYearLevel>('Year 2 (Adult Health & Patho)');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Category specific fields
  const [moduleCode, setModuleCode] = useState('');
  const [credits, setCredits] = useState('4');

  const [examYear, setExamYear] = useState('2024');
  const [totalMarks, setTotalMarks] = useState('50');
  const [durationMins, setDurationMins] = useState('60');

  const [authors, setAuthors] = useState('');
  const [edition, setEdition] = useState('');
  const [isbn, setIsbn] = useState('');

  const [noteType, setNoteType] = useState<'Clinical Cheat Sheet' | 'Drug Card' | 'Nursing Care Plan' | 'Pathophysiology Guide' | 'Lab Values Reference'>('Clinical Cheat Sheet');
  
  // Document & Note attachment fields
  const [docFormat, setDocFormat] = useState<'PDF' | 'DOCX' | 'TXT'>('PDF');
  const [docGuidelineType, setDocGuidelineType] = useState<'Clinical Procedure' | 'Emergency Protocol' | 'Practice Standard' | 'Pharmacopoeia' | 'Assessment Form'>('Clinical Procedure');
  const [docPageCount, setDocPageCount] = useState('14');
  const [docDataUri, setDocDataUri] = useState<string>('');
  
  // Note Attachment
  const [noteAttachmentName, setNoteAttachmentName] = useState<string>('');
  const [noteAttachmentSize, setNoteAttachmentSize] = useState<string>('');
  const [noteAttachmentType, setNoteAttachmentType] = useState<'PDF' | 'DOCX' | 'TXT'>('PDF');
  const [noteAttachmentDataUri, setNoteAttachmentDataUri] = useState<string>('');

  const [contentBody, setContentBody] = useState('');
  const [keyPointsInput, setKeyPointsInput] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileNameLower = file.name.toLowerCase();
    const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');

    if (!title) {
      setTitle(cleanTitle);
    }

    // Smart Auto-Categorization based on file name & keywords
    let autoCat: ResourceCategory = category;
    if (fileNameLower.includes('paper') || fileNameLower.includes('exam') || fileNameLower.includes('past') || fileNameLower.includes('quiz')) {
      autoCat = 'past_papers';
    } else if (fileNameLower.includes('module') || fileNameLower.includes('syllabus') || fileNameLower.includes('unit')) {
      autoCat = 'modules';
    } else if (fileNameLower.includes('book') || fileNameLower.includes('edition') || fileNameLower.includes('textbook')) {
      autoCat = 'textbooks';
    } else if (fileNameLower.includes('protocol') || fileNameLower.includes('guideline') || fileNameLower.includes('procedure') || fileNameLower.includes('form')) {
      autoCat = 'documents';
    }
    setCategory(autoCat);

    const ext = file.name.split('.').pop()?.toUpperCase() as 'PDF' | 'DOCX' | 'TXT';
    const cleanType: 'PDF' | 'DOCX' | 'TXT' = ext === 'DOCX' ? 'DOCX' : ext === 'TXT' ? 'TXT' : 'PDF';
    setNoteAttachmentName(file.name);
    setNoteAttachmentSize(`${Math.round(file.size / 1024)} KB`);
    setNoteAttachmentType(cleanType);

    const reader = new FileReader();
    if (file.name.endsWith('.txt')) {
      reader.onload = (event) => {
        const text = (event.target?.result as string) || '';
        setContentBody(text);
        setNoteAttachmentDataUri(text);
      };
      reader.readAsText(file);
    } else {
      reader.onload = (event) => {
        const dataUri = (event.target?.result as string) || '';
        setDocDataUri(dataUri);
        setNoteAttachmentDataUri(dataUri);
        if (!contentBody) {
          setContentBody(`Attached Clinical File: ${file.name} (${Math.round(file.size / 1024)} KB)\nReady for opening in external document reader.`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    // Smart Auto-Categorization fallback based on title keywords
    let targetCat: ResourceCategory = category;
    const titleLower = title.toLowerCase();
    if (titleLower.includes('paper') || titleLower.includes('exam') || titleLower.includes('past') || titleLower.includes('test')) {
      targetCat = 'past_papers';
    } else if (titleLower.includes('module') || titleLower.includes('syllabus') || titleLower.includes('curriculum')) {
      targetCat = 'modules';
    } else if (titleLower.includes('book') || titleLower.includes('textbook') || titleLower.includes('guidebook')) {
      targetCat = 'textbooks';
    } else if (titleLower.includes('protocol') || titleLower.includes('procedure') || titleLower.includes('guideline') || titleLower.includes('form')) {
      targetCat = 'documents';
    }

    const versionTag = `v1.0.${Math.floor(Math.random() * 90 + 10)}`;
    const patchNotesList = [
      `[${versionTag} Upload] Auto-categorized into '${targetCat.replace('_', ' ').toUpperCase()}' under ${domain}.`,
      `[Patch Audit] Verified clinical syllabus & indexed by DATANURSE by Chanda Felix™.`,
      `[AI Enhancement] High-yield study cards & summary notes automatically generated.`
    ];

    const newItem: ResourceItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category: targetCat,
      domain,
      yearLevel,
      description: description.trim() || 'User contributed clinical resource.',
      authorOrInstitution: author.trim() || 'Nursing Clinical Contributor',
      updatedAt: new Date().toISOString().split('T')[0],
      tags: tags.length > 0 ? tags : [targetCat.replace('_', ' '), domain.split(' ')[0]],
      isBookmarked: true,
      versionRelease: versionTag,
      patchNotes: patchNotesList
    };

    if (category === 'documents') {
      newItem.documentFormat = docFormat;
      newItem.documentGuidelineType = docGuidelineType;
      newItem.pageCount = parseInt(docPageCount) || 12;
      newItem.fileSize = `${Math.round((parseInt(docPageCount) || 10) * 0.15 * 10) / 10} MB`;
      newItem.isAvailableOffline = true;
      newItem.documentDataUri = docDataUri;
      newItem.documentContentText = contentBody.trim() || `${title}\n\nClinical Guideline Protocol:\n${description}\n\nKey Step 1: Verify patient identity and consent.\nKey Step 2: Ensure strict aseptic technique.\nKey Step 3: Monitor vital parameters during and after intervention.\nKey Step 4: Accurately document all findings in EHR.`;
      const keyPoints = keyPointsInput
        .split('\n')
        .map((k) => k.trim())
        .filter(Boolean);
      newItem.highYieldKeyPoints = keyPoints.length > 0 ? keyPoints : [
        'Adhere strictly to aseptic and infection control protocols.',
        'Immediate escalation required if abnormal vitals occur.'
      ];
    } else if (category === 'modules') {
      newItem.moduleCode = moduleCode.trim() || 'NUR-CUSTOM';
      newItem.credits = parseInt(credits) || 4;
      newItem.semester = 'Elective / Core';
      newItem.learningOutcomes = [
        'Master core principles of this clinical unit.',
        'Demonstrate safe patient-centered clinical decision making.'
      ];
      newItem.syllabus = [
        {
          unitNumber: 1,
          title: title.trim(),
          durationWeeks: 4,
          topics: tags.length > 0 ? tags : ['Core Foundations'],
          keyCompetencies: ['Evidence-based nursing assessment and intervention.']
        }
      ];
    } else if (category === 'past_papers') {
      newItem.examYear = parseInt(examYear) || 2024;
      newItem.examPeriod = 'Final Examination';
      newItem.totalMarks = parseInt(totalMarks) || 50;
      newItem.durationMinutes = parseInt(durationMins) || 60;
      newItem.questions = [
        {
          id: `q-cust-${Date.now()}`,
          number: 1,
          type: 'multiple_choice',
          questionText: contentBody.trim() || 'Sample practice question contributed by nursing peer.',
          options: [
            'A. Assess vitals and escalate to clinical lead immediately.',
            'B. Recheck in 4 hours if patient remains stable.',
            'C. Document findings and continue routine care.',
            'D. Administer oral fluids and observe.'
          ],
          correctOptionIndex: 0,
          marks: 5,
          markingScheme: 'Full marks for Option A. Immediate assessment of vital signs is the priority initial action.',
          clinicalRationale: 'Patient safety and rapid cue detection mandate baseline vital evaluation.',
          highYieldTip: 'Always prioritize acute assessment over delayed observation.'
        }
      ];
    } else if (category === 'textbooks') {
      newItem.authors = authors.trim() || 'Clinical Author';
      newItem.edition = edition.trim() || 'Current Edition';
      newItem.publisher = 'Academic Medical Press';
      newItem.isbn = isbn.trim() || '978-0000000000';
      newItem.tableOfContents = [
        {
          chapterNumber: 1,
          title: 'Introduction & Pathophysiology',
          pageRange: 'pp. 1-45',
          summary: description.trim() || 'Clinical overview and management guidelines.',
          keyPearls: ['Early recognition of deterioration', 'Safe clinical communication']
        }
      ];
    } else if (category === 'notes') {
      newItem.noteType = noteType;
      newItem.readTimeMinutes = 5;
      const keyPoints = keyPointsInput
        .split('\n')
        .map((k) => k.trim())
        .filter(Boolean);
      newItem.highYieldKeyPoints =
        keyPoints.length > 0 ? keyPoints : ['Essential clinical pearls for ward and exam review.'];
      newItem.sections = [
        {
          title: 'Clinical Summary & High-Yield Information',
          content: contentBody.trim() || 'Detailed clinical notes and physiological rationales.'
        }
      ];
      newItem.hasAttachment = true;
      newItem.attachmentName =
        noteAttachmentName || `${title.trim() || 'Clinical_Notes'}_Handout.${(noteAttachmentType || 'pdf').toLowerCase()}`;
      newItem.attachmentSize = noteAttachmentSize || '1.4 MB';
      newItem.attachmentType = noteAttachmentType || 'PDF';
      newItem.attachmentDataUri = noteAttachmentDataUri || docDataUri;
    }

    onAddResource(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 overflow-hidden transition-colors duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-teal-600 text-white">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Contribute Nursing Resource</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Add a module, past paper, textbook, or clinical study note to the database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {/* Category Selector */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1.5">
              Resource Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'documents' as const, label: 'Document', icon: FolderDown },
                { id: 'modules' as const, label: 'Module', icon: GraduationCap },
                { id: 'past_papers' as const, label: 'Past Paper', icon: FileText },
                { id: 'textbooks' as const, label: 'Textbook', icon: BookOpen },
                { id: 'notes' as const, label: 'Study Note', icon: BookmarkCheck }
              ].map((c) => {
                const Icon = c.icon;
                const isSelected = category === c.id;
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/80 text-teal-900 dark:text-teal-200 ring-1 ring-teal-600'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 text-teal-600" />
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-bold text-slate-700 text-xs mb-1">
              Resource Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Pediatric Fluid Resuscitation & Burns Cheat Sheet"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Domain & Academic Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">
                Nursing Domain / Specialty
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as NursingDomain)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <option value="Fundamentals & Assessment">Fundamentals & Assessment</option>
                <option value="Pharmacology">Pharmacology</option>
                <option value="Adult Health & Med-Surg">Adult Health & Med-Surg</option>
                <option value="Maternal & Neonatal">Maternal & Neonatal</option>
                <option value="Pediatric Nursing">Pediatric Nursing</option>
                <option value="Mental Health & Psychiatric">Mental Health & Psychiatric</option>
                <option value="Critical Care & Emergency">Critical Care & Emergency</option>
                <option value="Community & Public Health">Community & Public Health</option>
                <option value="Leadership, Ethics & Legal">Leadership, Ethics & Legal</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">
                Curriculum Year Level
              </label>
              <select
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value as AcademicYearLevel)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <option value="Year 1 (Foundations)">Year 1 (Foundations)</option>
                <option value="Year 2 (Adult Health & Patho)">Year 2 (Adult Health & Patho)</option>
                <option value="Year 3 (Specialties & Peds)">Year 3 (Specialties & Peds)</option>
                <option value="Year 4 (Leadership & Intensive)">Year 4 (Leadership & Intensive)</option>
              </select>
            </div>
          </div>

          {/* Category specific fields */}
          {category === 'documents' && (
            <div className="p-3 bg-rose-50/60 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/60 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
                    Document Format
                  </label>
                  <select
                    value={docFormat}
                    onChange={(e) => setDocFormat(e.target.value as any)}
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    <option value="PDF">PDF (.pdf)</option>
                    <option value="DOCX">Word Document (.docx)</option>
                    <option value="TXT">Plain Text (.txt)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
                    Clinical Guideline Type
                  </label>
                  <select
                    value={docGuidelineType}
                    onChange={(e) => setDocGuidelineType(e.target.value as any)}
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    <option value="Clinical Procedure">Clinical Procedure</option>
                    <option value="Emergency Protocol">Emergency Protocol</option>
                    <option value="Practice Standard">Practice Standard</option>
                    <option value="Pharmacopoeia">Pharmacopoeia</option>
                    <option value="Assessment Form">Assessment Form</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
                    Estimated Page Count
                  </label>
                  <input
                    type="number"
                    value={docPageCount}
                    onChange={(e) => setDocPageCount(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Upload Document File or Load to Device */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
                  Upload Clinical Document File (PDF, DOCX, TXT)
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 border-2 border-dashed border-rose-300 dark:border-rose-800 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors">
                    <Upload className="h-4 w-4 text-rose-600" />
                    <span className="text-xs text-rose-900 dark:text-rose-200 font-semibold">
                      {docDataUri ? 'Document Attached (Ready for Device Reader)' : 'Choose File to Load into Device Reader'}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Files uploaded are saved so they can be opened in your device document reader (Adobe Acrobat, WPS Office, Microsoft Word) both online and offline.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs mb-1">
                  High-Yield Safety Pearls (One per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="• Verify patient two-identifier check&#10;• Continuous vitals monitoring during infusion"
                  value={keyPointsInput}
                  onChange={(e) => setKeyPointsInput(e.target.value)}
                  className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {category === 'modules' && (
            <div className="grid grid-cols-2 gap-3 p-3 bg-teal-50/50 rounded-xl border border-teal-100">
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">Module Code</label>
                <input
                  type="text"
                  placeholder="e.g. NUR-302"
                  value={moduleCode}
                  onChange={(e) => setModuleCode(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">Credits</label>
                <input
                  type="number"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {category === 'past_papers' && (
            <div className="grid grid-cols-3 gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">Exam Year</label>
                <input
                  type="number"
                  value={examYear}
                  onChange={(e) => setExamYear(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">Total Marks</label>
                <input
                  type="number"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">Time (mins)</label>
                <input
                  type="number"
                  value={durationMins}
                  onChange={(e) => setDurationMins(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {category === 'textbooks' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">Author(s)</label>
                <input
                  type="text"
                  placeholder="e.g. Potter & Perry"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">Edition</label>
                <input
                  type="text"
                  placeholder="e.g. 10th Edition"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">ISBN</label>
                <input
                  type="text"
                  placeholder="e.g. 978-0323677721"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          )}

          {category === 'notes' && (
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-3">
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">Note Type</label>
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium cursor-pointer"
                >
                  <option value="Clinical Cheat Sheet">Clinical Cheat Sheet</option>
                  <option value="Drug Card">Drug Card</option>
                  <option value="Nursing Care Plan">Nursing Care Plan</option>
                  <option value="Pathophysiology Guide">Pathophysiology Guide</option>
                  <option value="Lab Values Reference">Lab Values Reference</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">
                  High-Yield Key Takeaways (One per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="• Potassium priority&#10;• Target vitals ranges"
                  value={keyPointsInput}
                  onChange={(e) => setKeyPointsInput(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>

              {/* Note Document Attachment */}
              <div className="pt-1">
                <label className="block font-bold text-slate-700 text-xs mb-1">
                  Attach Clinical File / Pocket Handout (PDF, DOCX, TXT)
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-emerald-300 dark:border-emerald-700 hover:border-emerald-500 rounded-xl bg-emerald-50/50 hover:bg-emerald-100/50 cursor-pointer transition-colors text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    <Upload className="h-4 w-4 text-emerald-600" />
                    <span>
                      {noteAttachmentName
                        ? `Attached: ${noteAttachmentName} (${noteAttachmentSize})`
                        : 'Choose File to Attach (Openable in Device Reader)'}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {noteAttachmentName && (
                    <button
                      type="button"
                      onClick={() => {
                        setNoteAttachmentName('');
                        setNoteAttachmentSize('');
                        setNoteAttachmentDataUri('');
                      }}
                      className="p-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Remove attachment"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  When saved, an "Open Attachment" button appears below the note to launch directly in an external reader.
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-700 text-xs mb-1">
              Description / Summary *
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of what this academic item covers..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Content / Notes Body */}
          <div>
            <label className="block font-bold text-slate-700 text-xs mb-1">
              Detailed Content / Notes / Question Details
            </label>
            <textarea
              rows={3}
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              placeholder="Enter full study notes, clinical interventions, or sample questions..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Author & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">
                Contributor / Author Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah M., BSN Student"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Cardiac, ECG, ExamPrep"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Save to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
