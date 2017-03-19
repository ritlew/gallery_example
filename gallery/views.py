from django.shortcuts import render


def gallery(request):
    images = list()
    for i in range(6):
        images.append('lion ({}).jpg'.format(i+1))
    return render(request, 'gallery/gallery.html', {'filenames': images})
