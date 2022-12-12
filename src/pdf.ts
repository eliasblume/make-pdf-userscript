import { jsPDF } from 'jspdf'

const A4_WIDTH = 210
const A4_HEIGHT = 297

export const createPdf = async (name: string) => {
    const doc = new jsPDF('p', 'mm', [A4_HEIGHT, A4_WIDTH])
    const pdfDoc = document.querySelector('eed-document') as HTMLDivElement
    pdfDoc.querySelectorAll('img').forEach((img, ix) => {
        if (ix !== 0) doc.addPage('a4', 'p')
        doc.addImage(img.src, 'PNG', 0, 0, A4_WIDTH, A4_HEIGHT)
    })

    doc.save(name)
}
